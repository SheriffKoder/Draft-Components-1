/*
MIT License

Copyright (c) 2017 Pavel Dobryakov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

export const particles = (incomingControls) => {
'use strict';
// Simulation section



//GUI
// window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
// ga('create', 'UA-105392568-1', 'auto');
// ga('send', 'pageview');



const canvas = document.getElementsByTagName('canvas')[0];
if (canvas) resizeCanvas();

// adjust the controller config
// change BACK_COLOR to change the canvas background color
let config = {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 512,
    CAPTURE_RESOLUTION: 512,
    DENSITY_DISSIPATION: 1,     //3.5
    VELOCITY_DISSIPATION: 0.2,    //0.48
    PRESSURE: 0.8,                  //5.8
    PRESSURE_ITERATIONS: 20,        //
    CURL: 8,                   //30
    SPLAT_RADIUS: incomingControls.size === "small" ? 0.05: 0.2,         //0.25 , me 0.05
    SPLAT_FORCE: 6000,          //
    SHADING: true,
    COLORFUL: true,
    COLOR_UPDATE_SPEED: 10,
    PAUSED: false,
    BACK_COLOR: { r: 0, g: 0, b: 0, },
    TRANSPARENT: false,
    BLOOM: true,
    BLOOM_ITERATIONS: 8,
    BLOOM_RESOLUTION: 256,
    BLOOM_INTENSITY: 0.8,
    BLOOM_THRESHOLD: 0.6,
    BLOOM_SOFT_KNEE: 0.7,
    SUNRAYS: false,              //true
    SUNRAYS_RESOLUTION: 196,
    SUNRAYS_WEIGHT: 1.0,
}

function pointerPrototype () {
    this.id = -1;
    this.texcoordX = 0;
    this.texcoordY = 0;
    this.prevTexcoordX = 0;
    this.prevTexcoordY = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.down = false;
    this.moved = false;
    this.color = [30, 0, 300];
}

let pointers = [];
let splatStack = [];
pointers.push(new pointerPrototype());


const { gl, ext } = getWebGLContext(canvas);

if (isMobile()) {
    config.DYE_RESOLUTION = 512;
}
if (!ext.supportLinearFiltering) {
    config.DYE_RESOLUTION = 512;
    config.SHADING = false;
    config.BLOOM = false;
    config.SUNRAYS = false;
}

// allow the controls GUI to be displayed
// startGUI();

function getWebGLContext (canvas) {
    const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };

    let gl = canvas.getContext('webgl2', params);
    const isWebGL2 = !!gl;
    if (!isWebGL2)
        gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);

    let halfFloat;
    let supportLinearFiltering;
    if (isWebGL2) {
        gl.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
    } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
    }

    gl.clearColor(0.0, 0.0, 0.0, 0.0);

    const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;
    let formatRGBA;
    let formatRG;
    let formatR;

    if (isWebGL2)
    {
        formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
    }
    else
    {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    }

    // ga('send', 'event', isWebGL2 ? 'webgl2' : 'webgl', formatRGBA == null ? 'not supported' : 'supported');

    return {
        gl,
        ext: {
            formatRGBA,
            formatRG,
            formatR,
            halfFloatTexType,
            supportLinearFiltering
        }
    };
}

function getSupportedFormat (gl, internalFormat, format, type)
{
    if (!supportRenderTextureFormat(gl, internalFormat, format, type))
    {
        switch (internalFormat)
        {
            case gl.R16F:
                return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
            case gl.RG16F:
                return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
            default:
                return null;
        }
    }

    return {
        internalFormat,
        format
    }
}

function supportRenderTextureFormat (gl, internalFormat, format, type) {
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

    let fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

    let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    return status == gl.FRAMEBUFFER_COMPLETE;
}

// Controls GUI
// function startGUI () {
//     var gui = new dat.GUI({ width: 300 });
//     gui.add(config, 'DYE_RESOLUTION', { 'high': 1024, 'medium': 512, 'low': 256, 'very low': 128 }).name('quality').onFinishChange(initFramebuffers);
//     gui.add(config, 'SIM_RESOLUTION', { '32': 32, '64': 64, '128': 128, '256': 256 }).name('sim resolution').onFinishChange(initFramebuffers);
//     gui.add(config, 'DENSITY_DISSIPATION', 0, 4.0).name('density diffusion');
//     gui.add(config, 'VELOCITY_DISSIPATION', 0, 4.0).name('velocity diffusion');
//     gui.add(config, 'PRESSURE', 0.0, 1.0).name('pressure');
//     gui.add(config, 'CURL', 0, 50).name('vorticity').step(1);
//     gui.add(config, 'SPLAT_RADIUS', 0.01, 1.0).name('splat radius');
//     gui.add(config, 'SHADING').name('shading').onFinishChange(updateKeywords);
//     gui.add(config, 'COLORFUL').name('colorful');
//     gui.add(config, 'PAUSED').name('paused').listen();

//     gui.add({ fun: () => {
//         splatStack.push(parseInt(Math.random() * 20) + 5);
//     } }, 'fun').name('Random splats');

//     let bloomFolder = gui.addFolder('Bloom');
//     bloomFolder.add(config, 'BLOOM').name('enabled').onFinishChange(updateKeywords);
//     bloomFolder.add(config, 'BLOOM_INTENSITY', 0.1, 2.0).name('intensity');
//     bloomFolder.add(config, 'BLOOM_THRESHOLD', 0.0, 1.0).name('threshold');

//     let sunraysFolder = gui.addFolder('Sunrays');
//     sunraysFolder.add(config, 'SUNRAYS').name('enabled').onFinishChange(updateKeywords);
//     sunraysFolder.add(config, 'SUNRAYS_WEIGHT', 0.3, 1.0).name('weight');

//     let captureFolder = gui.addFolder('Capture');
//     captureFolder.addColor(config, 'BACK_COLOR').name('background color');
//     captureFolder.add(config, 'TRANSPARENT').name('transparent');
//     captureFolder.add({ fun: captureScreenshot }, 'fun').name('take screenshot');

//     // let github = gui.add({ fun : () => {
//     //     window.open('https://github.com/PavelDoGreat/WebGL-Fluid-Simulation');
//     //     ga('send', 'event', 'link button', 'github');
//     // } }, 'fun').name('Github');
//     // github.__li.className = 'cr function bigFont';
//     // github.__li.style.borderLeft = '3px solid #8C8C8C';
//     // let githubIcon = document.createElement('span');
//     // github.domElement.parentElement.appendChild(githubIcon);
//     // githubIcon.className = 'icon github';

//     // let twitter = gui.add({ fun : () => {
//     //     ga('send', 'event', 'link button', 'twitter');
//     //     window.open('https://twitter.com/PavelDoGreat');
//     // } }, 'fun').name('Twitter');
//     // twitter.__li.className = 'cr function bigFont';
//     // twitter.__li.style.borderLeft = '3px solid #8C8C8C';
//     // let twitterIcon = document.createElement('span');
//     // twitter.domElement.parentElement.appendChild(twitterIcon);
//     // twitterIcon.className = 'icon twitter';

//     // let discord = gui.add({ fun : () => {
//     //     ga('send', 'event', 'link button', 'discord');
//     //     window.open('https://discordapp.com/invite/CeqZDDE');
//     // } }, 'fun').name('Discord');
//     // discord.__li.className = 'cr function bigFont';
//     // discord.__li.style.borderLeft = '3px solid #8C8C8C';
//     // let discordIcon = document.createElement('span');
//     // discord.domElement.parentElement.appendChild(discordIcon);
//     // discordIcon.className = 'icon discord';

//     // let app = gui.add({ fun : () => {
//     //     ga('send', 'event', 'link button', 'app');
//     //     window.open('http://onelink.to/5b58bn');
//     // } }, 'fun').name('Check out mobile app');
//     // app.__li.className = 'cr function appBigFont';
//     // app.__li.style.borderLeft = '3px solid #00FF7F';
//     // let appIcon = document.createElement('span');
//     // app.domElement.parentElement.appendChild(appIcon);
//     // appIcon.className = 'icon app';

//     if (isMobile())
//         gui.close();
// }

function isMobile () {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// ** //
function captureScreenshot () {
    let res = getResolution(config.CAPTURE_RESOLUTION);
    let target = createFBO(res.width, res.height, ext.formatRGBA.internalFormat, ext.formatRGBA.format, ext.halfFloatTexType, gl.NEAREST);
    render(target);

    let texture = framebufferToTexture(target);
    texture = normalizeTexture(texture, target.width, target.height);

    let captureCanvas = textureToCanvas(texture, target.width, target.height);
    let datauri = captureCanvas.toDataURL();
    downloadURI('fluid.png', datauri);
    URL.revokeObjectURL(datauri);
}

function framebufferToTexture (target) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    let length = target.width * target.height * 4;
    let texture = new Float32Array(length);
    gl.readPixels(0, 0, target.width, target.height, gl.RGBA, gl.FLOAT, texture);
    return texture;
}

function normalizeTexture (texture, width, height) {
    let result = new Uint8Array(texture.length);
    let id = 0;
    for (let i = height - 1; i >= 0; i--) {
        for (let j = 0; j < width; j++) {
            let nid = i * width * 4 + j * 4;
            result[nid + 0] = clamp01(texture[id + 0]) * 255;
            result[nid + 1] = clamp01(texture[id + 1]) * 255;
            result[nid + 2] = clamp01(texture[id + 2]) * 255;
            result[nid + 3] = clamp01(texture[id + 3]) * 255;
            id += 4;
        }
    }
    return result;
}

function clamp01 (input) {
    return Math.min(Math.max(input, 0), 1);
}

function textureToCanvas (texture, width, height) {
    let captureCanvas = document.createElement('canvas');
    let ctx = captureCanvas.getContext('2d');
    captureCanvas.width = width;
    captureCanvas.height = height;

    let imageData = ctx.createImageData(width, height);
    imageData.data.set(texture);
    ctx.putImageData(imageData, 0, 0);

    return captureCanvas;
}

// ** //
function downloadURI (filename, uri) {
    let link = document.createElement('a');
    link.download = filename;
    link.href = uri;
    document.body.appendChild(link);
    // link.click();
    document.body.removeChild(link);
}

class Material {
    constructor (vertexShader, fragmentShaderSource) {
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
        this.programs = [];
        this.activeProgram = null;
        this.uniforms = [];
    }

    setKeywords (keywords) {
        let hash = 0;
        for (let i = 0; i < keywords.length; i++)
            hash += hashCode(keywords[i]);

        let program = this.programs[hash];
        if (program == null)
        {
            let fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
            program = createProgram(this.vertexShader, fragmentShader);
            this.programs[hash] = program;
        }

        if (program == this.activeProgram) return;

        this.uniforms = getUniforms(program);
        this.activeProgram = program;
    }

    bind () {
        gl.useProgram(this.activeProgram);
    }
}

class Program {
    constructor (vertexShader, fragmentShader) {
        this.uniforms = {};
        this.program = createProgram(vertexShader, fragmentShader);
        this.uniforms = getUniforms(this.program);
    }

    bind () {
        gl.useProgram(this.program);
    }
}

function createProgram (vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        console.trace(gl.getProgramInfoLog(program));

    return program;
}

function getUniforms (program) {
    let uniforms = [];
    let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
        let uniformName = gl.getActiveUniform(program, i).name;
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
    }
    return uniforms;
}

function compileShader (type, source, keywords) {
    source = addKeywords(source, keywords);

    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        console.trace(gl.getShaderInfoLog(shader));

    return shader;
};

function addKeywords (source, keywords) {
    if (keywords == null) return source;
    let keywordsString = '';
    keywords.forEach(keyword => {
        keywordsString += '#define ' + keyword + '\n';
    });
    return keywordsString + source;
}

const baseVertexShader = compileShader(gl.VERTEX_SHADER, `
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`);

const blurVertexShader = compileShader(gl.VERTEX_SHADER, `
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        float offset = 1.33333333;
        vL = vUv - texelSize * offset;
        vR = vUv + texelSize * offset;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`);

const blurShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
        sum += texture2D(uTexture, vL) * 0.35294117;
        sum += texture2D(uTexture, vR) * 0.35294117;
        gl_FragColor = sum;
    }
`);

const copyShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
`);

const clearShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`);

const colorShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;

    uniform vec4 color;

    void main () {
        gl_FragColor = color;
    }
`);

const checkerboardShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float aspectRatio;

    #define SCALE 25.0

    void main () {
        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
        float v = mod(uv.x + uv.y, 2.0);
        v = v * 0.1 + 0.8;
        gl_FragColor = vec4(vec3(v), 1.0);
    }
`);

const displayShaderSource = `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uSunrays;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    uniform vec2 texelSize;

    vec3 linearToGamma (vec3 color) {
        color = max(color, vec3(0));
        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
    }

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;

    #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;

        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        c *= diffuse;
    #endif

    #ifdef BLOOM
        vec3 bloom = texture2D(uBloom, vUv).rgb;
    #endif

    #ifdef SUNRAYS
        float sunrays = texture2D(uSunrays, vUv).r;
        c *= sunrays;
    #ifdef BLOOM
        bloom *= sunrays;
    #endif
    #endif

    #ifdef BLOOM
        float noise = texture2D(uDithering, vUv * ditherScale).r;
        noise = noise * 2.0 - 1.0;
        bloom += noise / 255.0;
        bloom = linearToGamma(bloom);
        c += bloom;
    #endif

        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
    }
`;

const bloomPrefilterShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec3 curve;
    uniform float threshold;

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float br = max(c.r, max(c.g, c.b));
        float rq = clamp(br - curve.x, 0.0, curve.y);
        rq = curve.z * rq * rq;
        c *= max(rq, br - threshold) / max(br, 0.0001);
        gl_FragColor = vec4(c, 0.0);
    }
`);

const bloomBlurShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum;
    }
`);

const bloomFinalShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float intensity;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum * intensity;
    }
`);

const sunraysMaskShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        vec4 c = texture2D(uTexture, vUv);
        float br = max(c.r, max(c.g, c.b));
        c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
        gl_FragColor = c;
    }
`);

const sunraysShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float weight;

    #define ITERATIONS 16

    void main () {
        float Density = 0.3;
        float Decay = 0.95;
        float Exposure = 0.7;

        vec2 coord = vUv;
        vec2 dir = vUv - 0.5;

        dir *= 1.0 / float(ITERATIONS) * Density;
        float illuminationDecay = 1.0;

        float color = texture2D(uTexture, vUv).a;

        for (int i = 0; i < ITERATIONS; i++)
        {
            coord -= dir;
            float col = texture2D(uTexture, coord).a;
            color += col * illuminationDecay * weight;
            illuminationDecay *= Decay;
        }

        gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
    }
`);

const splatShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
`);

const advectionShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;

    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;

        vec2 iuv = floor(st);
        vec2 fuv = fract(st);

        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }

    void main () {
    #ifdef MANUAL_FILTERING
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
    #else
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
    #endif
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
    }`,
    ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']
);

const divergenceShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;

        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }

        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`);

const curlShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
`);

const vorticityShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;

    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;

        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;

        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity += force * dt;
        velocity = min(max(velocity, -1000.0), 1000.0);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`);

const pressureShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`);

const gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`);

const blit = (() => {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    return (target, clear = false) => {
        if (target == null)
        {
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }
        else
        {
            gl.viewport(0, 0, target.width, target.height);
            gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        }
        if (clear)
        {
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
        // CHECK_FRAMEBUFFER_STATUS();
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }
})();

function CHECK_FRAMEBUFFER_STATUS () {
    let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status != gl.FRAMEBUFFER_COMPLETE)
        console.trace("Framebuffer error: " + status);
}

let dye;
let velocity;
let divergence;
let curl;
let pressure;
let bloom;
let bloomFramebuffers = [];
let sunrays;
let sunraysTemp;

// let ditheringTexture = createTextureAsync('LDR_LLL1_0.png');
let ditheringTexture = createTextureAsync('');


const blurProgram            = new Program(blurVertexShader, blurShader);
const copyProgram            = new Program(baseVertexShader, copyShader);
const clearProgram           = new Program(baseVertexShader, clearShader);
const colorProgram           = new Program(baseVertexShader, colorShader);
const checkerboardProgram    = new Program(baseVertexShader, checkerboardShader);
const bloomPrefilterProgram  = new Program(baseVertexShader, bloomPrefilterShader);
const bloomBlurProgram       = new Program(baseVertexShader, bloomBlurShader);
const bloomFinalProgram      = new Program(baseVertexShader, bloomFinalShader);
const sunraysMaskProgram     = new Program(baseVertexShader, sunraysMaskShader);
const sunraysProgram         = new Program(baseVertexShader, sunraysShader);
const splatProgram           = new Program(baseVertexShader, splatShader);
const advectionProgram       = new Program(baseVertexShader, advectionShader);
const divergenceProgram      = new Program(baseVertexShader, divergenceShader);
const curlProgram            = new Program(baseVertexShader, curlShader);
const vorticityProgram       = new Program(baseVertexShader, vorticityShader);
const pressureProgram        = new Program(baseVertexShader, pressureShader);
const gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader);

const displayMaterial = new Material(baseVertexShader, displayShaderSource);

function initFramebuffers () {
    let simRes = getResolution(config.SIM_RESOLUTION);
    let dyeRes = getResolution(config.DYE_RESOLUTION);

    const texType = ext.halfFloatTexType;
    const rgba    = ext.formatRGBA;
    const rg      = ext.formatRG;
    const r       = ext.formatR;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    gl.disable(gl.BLEND);

    if (dye == null)
        dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
    else
        dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);

    if (velocity == null)
        velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
    else
        velocity = resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);

    divergence = createFBO      (simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    curl       = createFBO      (simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    pressure   = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);

    initBloomFramebuffers();
    initSunraysFramebuffers();
}

function initBloomFramebuffers () {
    let res = getResolution(config.BLOOM_RESOLUTION);

    const texType = ext.halfFloatTexType;
    const rgba = ext.formatRGBA;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    bloom = createFBO(res.width, res.height, rgba.internalFormat, rgba.format, texType, filtering);

    bloomFramebuffers.length = 0;
    for (let i = 0; i < config.BLOOM_ITERATIONS; i++)
    {
        let width = res.width >> (i + 1);
        let height = res.height >> (i + 1);

        if (width < 2 || height < 2) break;

        let fbo = createFBO(width, height, rgba.internalFormat, rgba.format, texType, filtering);
        bloomFramebuffers.push(fbo);
    }
}

function initSunraysFramebuffers () {
    let res = getResolution(config.SUNRAYS_RESOLUTION);

    const texType = ext.halfFloatTexType;
    const r = ext.formatR;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    sunrays     = createFBO(res.width, res.height, r.internalFormat, r.format, texType, filtering);
    sunraysTemp = createFBO(res.width, res.height, r.internalFormat, r.format, texType, filtering);
}

function createFBO (w, h, internalFormat, format, type, param) {
    gl.activeTexture(gl.TEXTURE0);
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

    let fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let texelSizeX = 1.0 / w;
    let texelSizeY = 1.0 / h;

    return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX,
        texelSizeY,
        attach (id) {
            gl.activeTexture(gl.TEXTURE0 + id);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            return id;
        }
    };
}

function createDoubleFBO (w, h, internalFormat, format, type, param) {
    let fbo1 = createFBO(w, h, internalFormat, format, type, param);
    let fbo2 = createFBO(w, h, internalFormat, format, type, param);

    return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        get read () {
            return fbo1;
        },
        set read (value) {
            fbo1 = value;
        },
        get write () {
            return fbo2;
        },
        set write (value) {
            fbo2 = value;
        },
        swap () {
            let temp = fbo1;
            fbo1 = fbo2;
            fbo2 = temp;
        }
    }
}

function resizeFBO (target, w, h, internalFormat, format, type, param) {
    let newFBO = createFBO(w, h, internalFormat, format, type, param);
    copyProgram.bind();
    gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
    blit(newFBO);
    return newFBO;
}

function resizeDoubleFBO (target, w, h, internalFormat, format, type, param) {
    if (target.width == w && target.height == h)
        return target;
    target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
    target.write = createFBO(w, h, internalFormat, format, type, param);
    target.width = w;
    target.height = h;
    target.texelSizeX = 1.0 / w;
    target.texelSizeY = 1.0 / h;
    return target;
}

function createTextureAsync (url) {
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255]));

    let obj = {
        texture,
        width: 1,
        height: 1,
        attach (id) {
            gl.activeTexture(gl.TEXTURE0 + id);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            return id;
        }
    };

    let image = new Image();
    image.onload = () => {
        obj.width = image.width;
        obj.height = image.height;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    };
    image.src = url;

    return obj;
}

function updateKeywords () {
    let displayKeywords = [];
    if (config.SHADING) displayKeywords.push("SHADING");
    if (config.BLOOM) displayKeywords.push("BLOOM");
    if (config.SUNRAYS) displayKeywords.push("SUNRAYS");
    displayMaterial.setKeywords(displayKeywords);
}

updateKeywords();
initFramebuffers();

// Disable entry animation
// take a number, changes the amount of smoke elements at entry animation
if (incomingControls.entry) {
    multipleSplats(parseInt(Math.random() * 20) + 5);
}

let lastUpdateTime = Date.now();
let colorUpdateTimer = 0.0;
update();

function update () {
    const dt = calcDeltaTime();
    if (resizeCanvas())
        initFramebuffers();
    updateColors(dt);
    applyInputs();
    if (!config.PAUSED)
        step(dt);
    render(null);
    requestAnimationFrame(update);
}

function calcDeltaTime () {
    let now = Date.now();
    let dt = (now - lastUpdateTime) / 1000;
    dt = Math.min(dt, 0.016666);
    lastUpdateTime = now;
    return dt;
}

function resizeCanvas () {
    let width = scaleByPixelRatio(canvas.clientWidth);
    let height = scaleByPixelRatio(canvas.clientHeight);
    if (canvas.width != width || canvas.height != height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }
    return false;
}

function updateColors (dt) {
    if (!config.COLORFUL) return;

    colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
    if (colorUpdateTimer >= 1) {
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
        pointers.forEach(p => {
            p.color = generateColor();
        });
    }
}

function applyInputs () {
    if (splatStack.length > 0)
        multipleSplats(splatStack.pop());

    pointers.forEach(p => {
        if (p.moved) {
            p.moved = false;
            splatPointer(p);
        }
    });
}

function step (dt) {
    gl.disable(gl.BLEND);

    curlProgram.bind();
    gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
    blit(curl);

    vorticityProgram.bind();
    gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
    gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
    gl.uniform1f(vorticityProgram.uniforms.dt, dt);
    blit(velocity.write);
    velocity.swap();

    divergenceProgram.bind();
    gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
    blit(divergence);

    clearProgram.bind();
    gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
    gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
    blit(pressure.write);
    pressure.swap();

    pressureProgram.bind();
    gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
    for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
    }

    gradienSubtractProgram.bind();
    gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
    gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
    blit(velocity.write);
    velocity.swap();

    advectionProgram.bind();
    gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    if (!ext.supportLinearFiltering)
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
    let velocityId = velocity.read.attach(0);
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
    gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
    gl.uniform1f(advectionProgram.uniforms.dt, dt);
    gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
    blit(velocity.write);
    velocity.swap();

    if (!ext.supportLinearFiltering)
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
    gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
    blit(dye.write);
    dye.swap();
}

// transparent / background transparency toggle configs
function render (target) {
    if (config.BLOOM)
        applyBloom(dye.read, bloom);
    if (config.SUNRAYS) {
        applySunrays(dye.read, dye.write, sunrays);
        blur(sunrays, sunraysTemp, 1);
    }
    

    if (target == null || !config.TRANSPARENT) {
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
    }
    else {
        gl.disable(gl.BLEND);
    }

    if (!config.TRANSPARENT)
        drawColor(target, normalizeColor(config.BACK_COLOR));
    if (target == null && config.TRANSPARENT)
        drawCheckerboard(target);
    drawDisplay(target);
}

function drawColor (target, color) {
    colorProgram.bind();
    gl.uniform4f(colorProgram.uniforms.color, color.r, color.g, color.b, 1);
    blit(target);
}

// function drawCheckerboard (target) {
//     checkerboardProgram.bind();
//     gl.uniform1f(checkerboardProgram.uniforms.aspectRatio, canvas.width / canvas.height);
//     blit(target);
// }

function drawDisplay (target) {
    let width = target == null ? gl.drawingBufferWidth : target.width;
    let height = target == null ? gl.drawingBufferHeight : target.height;

    displayMaterial.bind();
    if (config.SHADING)
        gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height);
    gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
    if (config.BLOOM) {
        gl.uniform1i(displayMaterial.uniforms.uBloom, bloom.attach(1));
        gl.uniform1i(displayMaterial.uniforms.uDithering, ditheringTexture.attach(2));
        let scale = getTextureScale(ditheringTexture, width, height);
        gl.uniform2f(displayMaterial.uniforms.ditherScale, scale.x, scale.y);
    }
    if (config.SUNRAYS)
        gl.uniform1i(displayMaterial.uniforms.uSunrays, sunrays.attach(3));
    blit(target);
}

function applyBloom (source, destination) {
    if (bloomFramebuffers.length < 2)
        return;

    let last = destination;

    gl.disable(gl.BLEND);
    bloomPrefilterProgram.bind();
    let knee = config.BLOOM_THRESHOLD * config.BLOOM_SOFT_KNEE + 0.0001;
    let curve0 = config.BLOOM_THRESHOLD - knee;
    let curve1 = knee * 2;
    let curve2 = 0.25 / knee;
    gl.uniform3f(bloomPrefilterProgram.uniforms.curve, curve0, curve1, curve2);
    gl.uniform1f(bloomPrefilterProgram.uniforms.threshold, config.BLOOM_THRESHOLD);
    gl.uniform1i(bloomPrefilterProgram.uniforms.uTexture, source.attach(0));
    blit(last);

    bloomBlurProgram.bind();
    for (let i = 0; i < bloomFramebuffers.length; i++) {
        let dest = bloomFramebuffers[i];
        gl.uniform2f(bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
        gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
        blit(dest);
        last = dest;
    }

    gl.blendFunc(gl.ONE, gl.ONE);
    gl.enable(gl.BLEND);

    for (let i = bloomFramebuffers.length - 2; i >= 0; i--) {
        let baseTex = bloomFramebuffers[i];
        gl.uniform2f(bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
        gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
        gl.viewport(0, 0, baseTex.width, baseTex.height);
        blit(baseTex);
        last = baseTex;
    }

    gl.disable(gl.BLEND);
    bloomFinalProgram.bind();
    gl.uniform2f(bloomFinalProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
    gl.uniform1i(bloomFinalProgram.uniforms.uTexture, last.attach(0));
    gl.uniform1f(bloomFinalProgram.uniforms.intensity, config.BLOOM_INTENSITY);
    blit(destination);
}

function applySunrays (source, mask, destination) {
    gl.disable(gl.BLEND);
    sunraysMaskProgram.bind();
    gl.uniform1i(sunraysMaskProgram.uniforms.uTexture, source.attach(0));
    blit(mask);

    sunraysProgram.bind();
    gl.uniform1f(sunraysProgram.uniforms.weight, config.SUNRAYS_WEIGHT);
    gl.uniform1i(sunraysProgram.uniforms.uTexture, mask.attach(0));
    blit(destination);
}

function blur (target, temp, iterations) {
    blurProgram.bind();
    for (let i = 0; i < iterations; i++) {
        gl.uniform2f(blurProgram.uniforms.texelSize, target.texelSizeX, 0.0);
        gl.uniform1i(blurProgram.uniforms.uTexture, target.attach(0));
        blit(temp);

        gl.uniform2f(blurProgram.uniforms.texelSize, 0.0, target.texelSizeY);
        gl.uniform1i(blurProgram.uniforms.uTexture, temp.attach(0));
        blit(target);
    }
}

function splatPointer (pointer) {
    let dx = pointer.deltaX * config.SPLAT_FORCE;
    let dy = pointer.deltaY * config.SPLAT_FORCE;
    splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
}

// random smoke
function multipleSplats (amount) {
    for (let i = 0; i < amount; i++) {
        const color = generateColor();
        color.r *= 10.0;
        color.g *= 10.0;
        color.b *= 10.0;
        const x = Math.random();
        const y = Math.random();
        const dx = 1000 * (Math.random() - 0.5);
        const dy = 1000 * (Math.random() - 0.5);
        splat(x, y, dx, dy, color);
    }
}


function splat (x, y, dx, dy, color) {
    splatProgram.bind();
    gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
    gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
    gl.uniform2f(splatProgram.uniforms.point, x, y);
    gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
    gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
    blit(velocity.write);
    velocity.swap();

    gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
    gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
    blit(dye.write);
    dye.swap();
}

// change size of smoke
function correctRadius (radius) {
    let smokeSize = 1;
    let aspectRatio = (canvas.width / canvas.height)*smokeSize;
    // if (aspectRatio > 1)
        radius *= aspectRatio;
    return radius;
}




// Change the element that will trigger the animation
const mainBody = document.querySelector("#mainContent");    //was "canvas" previously




// event listeners


// mainBody.addEventListener('mouseenter', e => {
//     let posX = scaleByPixelRatio(e.clientX);
//     let posY = scaleByPixelRatio(e.clientY);
//     let pointer = pointers.find(p => p.id == -1);
//     if (pointer == null)
//         pointer = new pointerPrototype();
//     updatePointerDownData(pointer, -1, posX, posY);
// });




mainBody.addEventListener('mousemove', e => {
    let pointer = pointers[0];
    // if (!pointer.down) return;
    let posX = scaleByPixelRatio(e.clientX);
    let posY = scaleByPixelRatio(e.clientY);
    updatePointerMoveData(pointer, posX, posY);
});


window.addEventListener('mouseup', () => {
    updatePointerUpData(pointers[0]);
});


mainBody.addEventListener('touchstart', e => {
    e.preventDefault();
    const touches = e.targetTouches;
    while (touches.length >= pointers.length)
        pointers.push(new pointerPrototype());
    for (let i = 0; i < touches.length; i++) {
        let posX = scaleByPixelRatio(touches[i].pageX);
        let posY = scaleByPixelRatio(touches[i].pageY);
        updatePointerDownData(pointers[i + 1], touches[i].identifier, posX, posY);
    }
});

mainBody.addEventListener('touchmove', e => {
    e.preventDefault();
    const touches = e.targetTouches;
    for (let i = 0; i < touches.length; i++) {
        let pointer = pointers[i + 1];
        if (!pointer.down) continue;
        let posX = scaleByPixelRatio(touches[i].pageX);
        let posY = scaleByPixelRatio(touches[i].pageY);
        updatePointerMoveData(pointer, posX, posY);
    }
}, false);

mainBody.addEventListener('touchend', e => {
    const touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++)
    {
        let pointer = pointers.find(p => p.id == touches[i].identifier);
        if (pointer == null) continue;
        updatePointerUpData(pointer);
    }
});

mainBody.addEventListener('keydown', e => {
    if (e.code === 'KeyP')
        config.PAUSED = !config.PAUSED;
    if (e.key === ' ')
        splatStack.push(parseInt(Math.random() * 20) + 5);
});



// pointer.color changes of color happens while moving the mouse
// thus. when moving the mouse, the color changes on the already started animation
// can set a global value to keep the same color
function updatePointerDownData (pointer, id, posX, posY) {
    pointer.id = id;
    pointer.down = true;
    pointer.moved = false;
    pointer.texcoordX = posX / canvas.width;
    pointer.texcoordY = 1.0 - posY / canvas.height;
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.deltaX = 0;
    pointer.deltaY = 0;
    pointer.color = generateColor();
}

function updatePointerMoveData (pointer, posX, posY) {
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.texcoordX = posX / canvas.width;
    pointer.texcoordY = 1.0 - posY / canvas.height;
    pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
    pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
    pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
}

function updatePointerUpData (pointer) {
    pointer.down = false;
}

function correctDeltaX (delta) {
    let aspectRatio = canvas.width / canvas.height;
    if (aspectRatio < 1) delta *= aspectRatio;
    return delta;
}

function correctDeltaY (delta) {
    let aspectRatio = canvas.width / canvas.height;
    if (aspectRatio > 1) delta /= aspectRatio;
    return delta;
}

// change color


function generateColor () {

   

    let c = [{ r: 0, g: 0, b:1 }, { r: 0, g: 0.5, b:0.5 }];  // array of 2 custom colors by RGB values
    c = c[Math.floor(Math.random() * 2)];                // choose randomly from 0-1 indexes


    if (incomingControls.color === "blue") {
        // blue
        let newColor = { r: 0.05, g: 0.2, b:0.8 };
        c = newColor;

    } else if (incomingControls.color === "red") {
        // red
        c = { r: 0.8, g: 0, b:0.2 };

    } else if (incomingControls.color === "green") {
        // green
        c = { r: 0, g: 0.5, b:0.3 };

    } else if (incomingControls.color === "random") {
         //random
        c = HSVtoRGB(Math.random(), 1.0, 1.0);                  // the original "random colors"

    } else if (incomingControls.color === "select") {
        // c = {r: x, g: y, b: z};
        let x = incomingControls.rgb.r*0.0019;
        let y = incomingControls.rgb.g*0.0019;
        let z = incomingControls.rgb.b*0.0019;
        c = {r:x, g:y, b:z}
    }

    c.r *= 0.15;
    c.g *= 0.15;
    c.b *= 0.15;
    return c;
}




function HSVtoRGB (h, s, v) {
    let r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return {
        r,
        g,
        b
    };
}

function normalizeColor (input) {
    let output = {
        r: input.r / 255,
        g: input.g / 255,
        b: input.b / 255
    };
    return output;
}

function wrap (value, min, max) {
    let range = max - min;
    if (range == 0) return min;
    return (value - min) % range + min;
}

function getResolution (resolution) {
    let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
    if (aspectRatio < 1)
        aspectRatio = 1.0 / aspectRatio;

    let min = Math.round(resolution);
    let max = Math.round(resolution * aspectRatio);

    if (gl.drawingBufferWidth > gl.drawingBufferHeight)
        return { width: max, height: min };
    else
        return { width: min, height: max };
}

function getTextureScale (texture, width, height) {
    return {
        x: width / texture.width,
        y: height / texture.height
    };
}

function scaleByPixelRatio (input) {
    let pixelRatio = window.devicePixelRatio || 1;
    return Math.floor(input * pixelRatio);
}

function hashCode (s) {
    if (s.length == 0) return 0;
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};



// manual simulation

let objs = [];
let time1 = 0;

// RECORD an object for x,y,time between cursor movements
// mainBody.addEventListener("mousemove", function record (e) {

//         time1 !== 0 ? time1 = performance.now() : "";
//         console.log(e.clientX);
//         console.log(e.clientY);
//         let pox = e.clientX;
//         let poy = e.clientY;
//         let time2 = performance.now();
//         let total = time2-time1
    
//         objs.push({pox, poy, total});    
    
// });



// apply or clear - console the object or clear on click on mainelement
// let ready = false;
// mainBody.addEventListener("click", e => {

//     ready = !ready;
//     if (ready) {
//         console.log("ready");
//         simulateMovement();
//     } else {
//         console.log("clearing");
//         objs = [];
//             updatePointerUpData(pointers[0]);

//     }
//     console.log(objs);

// });

// this is a saved object of mouse movement record
let obj2 = [
    {
        "pox": 0,
        "poy": 158,
        "total": 2258
    },
    {
        "pox": 0,
        "poy": 158,
        "total": 2258.60000000149
    },
    {
        "pox": 29,
        "poy": 150,
        "total": 2301.800000000745
    },
    {
        "pox": 35,
        "poy": 149,
        "total": 2302.4000000003725
    },
    {
        "pox": 41,
        "poy": 147,
        "total": 2310.7000000011176
    },
    {
        "pox": 47,
        "poy": 145,
        "total": 2317.5
    },
    {
        "pox": 53,
        "poy": 144,
        "total": 2326.4000000003725
    },
    {
        "pox": 58,
        "poy": 142,
        "total": 2333.9000000003725
    },
    {
        "pox": 63,
        "poy": 141,
        "total": 2341.800000000745
    },
    {
        "pox": 69,
        "poy": 140,
        "total": 2350
    },
    {
        "pox": 74,
        "poy": 138,
        "total": 2358.4000000003725
    },
    {
        "pox": 79,
        "poy": 137,
        "total": 2366.800000000745
    },
    {
        "pox": 83,
        "poy": 137,
        "total": 2374
    },
    {
        "pox": 87,
        "poy": 135,
        "total": 2381.9000000003725
    },
    {
        "pox": 92,
        "poy": 135,
        "total": 2389.9000000003725
    },
    {
        "pox": 96,
        "poy": 135,
        "total": 2398.9000000003725
    },
    {
        "pox": 101,
        "poy": 135,
        "total": 2405.9000000003725
    },
    {
        "pox": 106,
        "poy": 134,
        "total": 2413.800000000745
    },
    {
        "pox": 111,
        "poy": 134,
        "total": 2422
    },
    {
        "pox": 116,
        "poy": 134,
        "total": 2430.7000000011176
    },
    {
        "pox": 120,
        "poy": 134,
        "total": 2438.300000000745
    },
    {
        "pox": 125,
        "poy": 134,
        "total": 2445.4000000003725
    },
    {
        "pox": 128,
        "poy": 134,
        "total": 2454.300000000745
    },
    {
        "pox": 132,
        "poy": 134,
        "total": 2463
    },
    {
        "pox": 136,
        "poy": 134,
        "total": 2470
    },
    {
        "pox": 141,
        "poy": 134,
        "total": 2477.800000000745
    },
    {
        "pox": 146,
        "poy": 134,
        "total": 2485.800000000745
    },
    {
        "pox": 151,
        "poy": 136,
        "total": 2494.300000000745
    },
    {
        "pox": 157,
        "poy": 137,
        "total": 2502.10000000149
    },
    {
        "pox": 165,
        "poy": 139,
        "total": 2510.2000000011176
    },
    {
        "pox": 171,
        "poy": 140,
        "total": 2518.300000000745
    },
    {
        "pox": 178,
        "poy": 142,
        "total": 2525.5
    },
    {
        "pox": 187,
        "poy": 145,
        "total": 2533.4000000003725
    },
    {
        "pox": 194,
        "poy": 146,
        "total": 2542
    },
    {
        "pox": 201,
        "poy": 148,
        "total": 2550.4000000003725
    },
    {
        "pox": 208,
        "poy": 150,
        "total": 2557.9000000003725
    },
    {
        "pox": 214,
        "poy": 152,
        "total": 2565.7000000011176
    },
    {
        "pox": 220,
        "poy": 154,
        "total": 2574.10000000149
    },
    {
        "pox": 227,
        "poy": 156,
        "total": 2581.5
    },
    {
        "pox": 233,
        "poy": 157,
        "total": 2590.300000000745
    },
    {
        "pox": 240,
        "poy": 159,
        "total": 2598
    },
    {
        "pox": 246,
        "poy": 161,
        "total": 2605.60000000149
    },
    {
        "pox": 252,
        "poy": 163,
        "total": 2614
    },
    {
        "pox": 259,
        "poy": 165,
        "total": 2622.10000000149
    },
    {
        "pox": 265,
        "poy": 168,
        "total": 2630.10000000149
    },
    {
        "pox": 272,
        "poy": 171,
        "total": 2638
    },
    {
        "pox": 279,
        "poy": 173,
        "total": 2646.4000000003725
    },
    {
        "pox": 284,
        "poy": 175,
        "total": 2654.4000000003725
    },
    {
        "pox": 290,
        "poy": 178,
        "total": 2661.9000000003725
    },
    {
        "pox": 297,
        "poy": 180,
        "total": 2670.300000000745
    },
    {
        "pox": 302,
        "poy": 184,
        "total": 2679.2000000011176
    },
    {
        "pox": 308,
        "poy": 187,
        "total": 2685.9000000003725
    },
    {
        "pox": 314,
        "poy": 190,
        "total": 2695.10000000149
    },
    {
        "pox": 343,
        "poy": 202,
        "total": 2747.300000000745
    },
    {
        "pox": 347,
        "poy": 203,
        "total": 2750.10000000149
    },
    {
        "pox": 350,
        "poy": 205,
        "total": 2758.4000000003725
    },
    {
        "pox": 354,
        "poy": 206,
        "total": 2765.4000000003725
    },
    {
        "pox": 357,
        "poy": 208,
        "total": 2774.2000000011176
    },
    {
        "pox": 360,
        "poy": 209,
        "total": 2781.800000000745
    },
    {
        "pox": 364,
        "poy": 211,
        "total": 2790.300000000745
    },
    {
        "pox": 367,
        "poy": 213,
        "total": 2797.5
    },
    {
        "pox": 371,
        "poy": 215,
        "total": 2808.9000000003725
    },
    {
        "pox": 374,
        "poy": 217,
        "total": 2813.5
    },
    {
        "pox": 379,
        "poy": 219,
        "total": 2821.800000000745
    },
    {
        "pox": 382,
        "poy": 221,
        "total": 2829.9000000003725
    },
    {
        "pox": 387,
        "poy": 224,
        "total": 2838.300000000745
    },
    {
        "pox": 390,
        "poy": 227,
        "total": 2846.10000000149
    },
    {
        "pox": 394,
        "poy": 229,
        "total": 2854.7000000011176
    },
    {
        "pox": 398,
        "poy": 232,
        "total": 2861.60000000149
    },
    {
        "pox": 403,
        "poy": 235,
        "total": 2869.5
    },
    {
        "pox": 407,
        "poy": 239,
        "total": 2877.5
    },
    {
        "pox": 411,
        "poy": 242,
        "total": 2886.4000000003725
    },
    {
        "pox": 416,
        "poy": 245,
        "total": 2894.10000000149
    },
    {
        "pox": 421,
        "poy": 249,
        "total": 2901.4000000003725
    },
    {
        "pox": 426,
        "poy": 253,
        "total": 2910.10000000149
    },
    {
        "pox": 430,
        "poy": 256,
        "total": 2917.5
    },
    {
        "pox": 435,
        "poy": 260,
        "total": 2927.9000000003725
    },
    {
        "pox": 440,
        "poy": 264,
        "total": 2934.10000000149
    },
    {
        "pox": 446,
        "poy": 268,
        "total": 2941.7000000011176
    },
    {
        "pox": 452,
        "poy": 273,
        "total": 2949.7000000011176
    },
    {
        "pox": 458,
        "poy": 278,
        "total": 2959.60000000149
    },
    {
        "pox": 463,
        "poy": 283,
        "total": 2965.9000000003725
    },
    {
        "pox": 468,
        "poy": 288,
        "total": 2973.60000000149
    },
    {
        "pox": 473,
        "poy": 293,
        "total": 2982.2000000011176
    },
    {
        "pox": 478,
        "poy": 299,
        "total": 2989.7000000011176
    },
    {
        "pox": 483,
        "poy": 305,
        "total": 2997.800000000745
    },
    {
        "pox": 489,
        "poy": 310,
        "total": 3006.10000000149
    },
    {
        "pox": 494,
        "poy": 315,
        "total": 3014.2000000011176
    },
    {
        "pox": 499,
        "poy": 320,
        "total": 3022.7000000011176
    },
    {
        "pox": 504,
        "poy": 325,
        "total": 3029.9000000003725
    },
    {
        "pox": 508,
        "poy": 330,
        "total": 3038.7000000011176
    },
    {
        "pox": 513,
        "poy": 335,
        "total": 3045.800000000745
    },
    {
        "pox": 518,
        "poy": 341,
        "total": 3053.7000000011176
    },
    {
        "pox": 524,
        "poy": 347,
        "total": 3061.800000000745
    },
    {
        "pox": 530,
        "poy": 354,
        "total": 3069.9000000003725
    },
    {
        "pox": 535,
        "poy": 361,
        "total": 3077.9000000003725
    },
    {
        "pox": 540,
        "poy": 367,
        "total": 3086.10000000149
    },
    {
        "pox": 546,
        "poy": 374,
        "total": 3093.9000000003725
    },
    {
        "pox": 550,
        "poy": 380,
        "total": 3102.60000000149
    },
    {
        "pox": 555,
        "poy": 386,
        "total": 3109.60000000149
    },
    {
        "pox": 559,
        "poy": 392,
        "total": 3118.800000000745
    },
    {
        "pox": 564,
        "poy": 398,
        "total": 3125.60000000149
    },
    {
        "pox": 569,
        "poy": 405,
        "total": 3136
    },
    {
        "pox": 575,
        "poy": 412,
        "total": 3141.800000000745
    },
    {
        "pox": 581,
        "poy": 418,
        "total": 3150.60000000149
    },
    {
        "pox": 586,
        "poy": 425,
        "total": 3158.300000000745
    },
    {
        "pox": 592,
        "poy": 432,
        "total": 3166.2000000011176
    },
    {
        "pox": 598,
        "poy": 441,
        "total": 3174.300000000745
    },
    {
        "pox": 603,
        "poy": 447,
        "total": 3181.7000000011176
    },
    {
        "pox": 608,
        "poy": 454,
        "total": 3190
    },
    {
        "pox": 613,
        "poy": 461,
        "total": 3198.2000000011176
    },
    {
        "pox": 617,
        "poy": 467,
        "total": 3205.9000000003725
    },
    {
        "pox": 622,
        "poy": 474,
        "total": 3213.9000000003725
    },
    {
        "pox": 627,
        "poy": 480,
        "total": 3221.60000000149
    },
    {
        "pox": 631,
        "poy": 486,
        "total": 3229.9000000003725
    },
    {
        "pox": 637,
        "poy": 491,
        "total": 3238.5
    },
    {
        "pox": 640,
        "poy": 497,
        "total": 3245.300000000745
    },
    {
        "pox": 645,
        "poy": 503,
        "total": 3253.5
    },
    {
        "pox": 649,
        "poy": 509,
        "total": 3261.60000000149
    },
    {
        "pox": 654,
        "poy": 515,
        "total": 3270.60000000149
    },
    {
        "pox": 658,
        "poy": 520,
        "total": 3277.7000000011176
    },
    {
        "pox": 662,
        "poy": 526,
        "total": 3285.10000000149
    },
    {
        "pox": 666,
        "poy": 532,
        "total": 3293.4000000003725
    },
    {
        "pox": 670,
        "poy": 538,
        "total": 3301.4000000003725
    },
    {
        "pox": 674,
        "poy": 544,
        "total": 3309.9000000003725
    },
    {
        "pox": 678,
        "poy": 550,
        "total": 3317.300000000745
    },
    {
        "pox": 681,
        "poy": 556,
        "total": 3325.60000000149
    },
    {
        "pox": 685,
        "poy": 561,
        "total": 3334
    },
    {
        "pox": 689,
        "poy": 566,
        "total": 3342.10000000149
    },
    {
        "pox": 693,
        "poy": 571,
        "total": 3350.2000000011176
    },
    {
        "pox": 696,
        "poy": 577,
        "total": 3358.4000000003725
    },
    {
        "pox": 710,
        "poy": 596,
        "total": 3393.9000000003725
    },
    {
        "pox": 714,
        "poy": 601,
        "total": 3398.7000000011176
    },
    {
        "pox": 717,
        "poy": 605,
        "total": 3405.4000000003725
    },
    {
        "pox": 721,
        "poy": 611,
        "total": 3414.5
    },
    {
        "pox": 724,
        "poy": 615,
        "total": 3422.5
    },
    {
        "pox": 727,
        "poy": 619,
        "total": 3430
    },
    {
        "pox": 730,
        "poy": 622,
        "total": 3438.2000000011176
    },
    {
        "pox": 732,
        "poy": 626,
        "total": 3447
    },
    {
        "pox": 736,
        "poy": 630,
        "total": 3454.300000000745
    },
    {
        "pox": 738,
        "poy": 634,
        "total": 3462.9000000003725
    },
    {
        "pox": 741,
        "poy": 638,
        "total": 3469.60000000149
    },
    {
        "pox": 744,
        "poy": 643,
        "total": 3477.60000000149
    },
    {
        "pox": 747,
        "poy": 647,
        "total": 3485.2000000011176
    },
    {
        "pox": 751,
        "poy": 652,
        "total": 3493.300000000745
    },
    {
        "pox": 754,
        "poy": 656,
        "total": 3502
    },
    {
        "pox": 758,
        "poy": 661,
        "total": 3510.60000000149
    },
    {
        "pox": 761,
        "poy": 665,
        "total": 3518
    },
    {
        "pox": 765,
        "poy": 670,
        "total": 3525.60000000149
    },
    {
        "pox": 768,
        "poy": 673,
        "total": 3533.800000000745
    },
    {
        "pox": 771,
        "poy": 676,
        "total": 3542.10000000149
    },
    {
        "pox": 774,
        "poy": 679,
        "total": 3549.9000000003725
    },
    {
        "pox": 776,
        "poy": 682,
        "total": 3558.10000000149
    },
    {
        "pox": 778,
        "poy": 686,
        "total": 3565.9000000003725
    },
    {
        "pox": 781,
        "poy": 688,
        "total": 3574.4000000003725
    },
    {
        "pox": 786,
        "poy": 692,
        "total": 3581.9000000003725
    },
    {
        "pox": 790,
        "poy": 695,
        "total": 3589.5
    },
    {
        "pox": 795,
        "poy": 699,
        "total": 3596.60000000149
    },
    {
        "pox": 800,
        "poy": 702,
        "total": 3605.300000000745
    },
    {
        "pox": 804,
        "poy": 705,
        "total": 3612.300000000745
    },
    {
        "pox": 808,
        "poy": 708,
        "total": 3620.9000000003725
    },
    {
        "pox": 813,
        "poy": 711,
        "total": 3628.7000000011176
    },
    {
        "pox": 817,
        "poy": 714,
        "total": 3636.60000000149
    },
    {
        "pox": 822,
        "poy": 717,
        "total": 3645.7000000011176
    },
    {
        "pox": 826,
        "poy": 719,
        "total": 3653.300000000745
    },
    {
        "pox": 830,
        "poy": 723,
        "total": 3661.800000000745
    },
    {
        "pox": 835,
        "poy": 726,
        "total": 3668.4000000003725
    },
    {
        "pox": 839,
        "poy": 729,
        "total": 3677
    },
    {
        "pox": 844,
        "poy": 733,
        "total": 3684.800000000745
    },
    {
        "pox": 850,
        "poy": 736,
        "total": 3692.800000000745
    },
    {
        "pox": 855,
        "poy": 740,
        "total": 3700.7000000011176
    },
    {
        "pox": 861,
        "poy": 743,
        "total": 3710.10000000149
    },
    {
        "pox": 866,
        "poy": 747,
        "total": 3717.2000000011176
    },
    {
        "pox": 871,
        "poy": 750,
        "total": 3726
    },
    {
        "pox": 876,
        "poy": 753,
        "total": 3733.2000000011176
    },
    {
        "pox": 881,
        "poy": 755,
        "total": 3743.300000000745
    },
    {
        "pox": 884,
        "poy": 757,
        "total": 3748.800000000745
    },
    {
        "pox": 888,
        "poy": 760,
        "total": 3757.800000000745
    },
    {
        "pox": 893,
        "poy": 761,
        "total": 3764.7000000011176
    },
    {
        "pox": 897,
        "poy": 764,
        "total": 3774.10000000149
    },
    {
        "pox": 902,
        "poy": 766,
        "total": 3781.10000000149
    },
    {
        "pox": 907,
        "poy": 768,
        "total": 3789.10000000149
    },
    {
        "pox": 912,
        "poy": 770,
        "total": 3796.7000000011176
    },
    {
        "pox": 917,
        "poy": 772,
        "total": 3805.7000000011176
    },
    {
        "pox": 922,
        "poy": 774,
        "total": 3813.4000000003725
    },
    {
        "pox": 926,
        "poy": 776,
        "total": 3820.9000000003725
    },
    {
        "pox": 930,
        "poy": 778,
        "total": 3829
    },
    {
        "pox": 935,
        "poy": 779,
        "total": 3837.300000000745
    },
    {
        "pox": 939,
        "poy": 781,
        "total": 3845.10000000149
    },
    {
        "pox": 944,
        "poy": 783,
        "total": 3852.5
    },
    {
        "pox": 949,
        "poy": 784,
        "total": 3861.4000000003725
    },
    {
        "pox": 953,
        "poy": 785,
        "total": 3869.4000000003725
    },
    {
        "pox": 957,
        "poy": 786,
        "total": 3876.7000000011176
    },
    {
        "pox": 969,
        "poy": 789,
        "total": 3908.2000000011176
    },
    {
        "pox": 972,
        "poy": 790,
        "total": 3908.60000000149
    },
    {
        "pox": 976,
        "poy": 791,
        "total": 3917.2000000011176
    },
    {
        "pox": 980,
        "poy": 792,
        "total": 3924.9000000003725
    },
    {
        "pox": 984,
        "poy": 793,
        "total": 3932.4000000003725
    },
    {
        "pox": 988,
        "poy": 794,
        "total": 3940.7000000011176
    },
    {
        "pox": 993,
        "poy": 796,
        "total": 3948.5
    },
    {
        "pox": 998,
        "poy": 796,
        "total": 3956.7000000011176
    },
    {
        "pox": 1003,
        "poy": 798,
        "total": 3964.7000000011176
    },
    {
        "pox": 1007,
        "poy": 798,
        "total": 3972.4000000003725
    },
    {
        "pox": 1012,
        "poy": 799,
        "total": 3980.60000000149
    },
    {
        "pox": 1017,
        "poy": 801,
        "total": 3988.9000000003725
    },
    {
        "pox": 1022,
        "poy": 803,
        "total": 3996.7000000011176
    },
    {
        "pox": 1026,
        "poy": 803,
        "total": 4004.300000000745
    },
    {
        "pox": 1030,
        "poy": 804,
        "total": 4012.60000000149
    },
    {
        "pox": 1034,
        "poy": 805,
        "total": 4022
    },
    {
        "pox": 1037,
        "poy": 805,
        "total": 4028.2000000011176
    },
    {
        "pox": 1039,
        "poy": 805,
        "total": 4036.800000000745
    },
    {
        "pox": 1042,
        "poy": 805,
        "total": 4044.5
    },
    {
        "pox": 1044,
        "poy": 806,
        "total": 4052.800000000745
    },
    {
        "pox": 1046,
        "poy": 806,
        "total": 4060.5
    },
    {
        "pox": 1048,
        "poy": 806,
        "total": 4068.800000000745
    },
    {
        "pox": 1050,
        "poy": 806,
        "total": 4077
    },
    {
        "pox": 1053,
        "poy": 806,
        "total": 4084.9000000003725
    },
    {
        "pox": 1055,
        "poy": 806,
        "total": 4093.4000000003725
    },
    {
        "pox": 1058,
        "poy": 806,
        "total": 4100.4000000003725
    },
    {
        "pox": 1060,
        "poy": 806,
        "total": 4108.60000000149
    },
    {
        "pox": 1062,
        "poy": 806,
        "total": 4116.800000000745
    },
    {
        "pox": 1064,
        "poy": 806,
        "total": 4124.60000000149
    },
    {
        "pox": 1067,
        "poy": 806,
        "total": 4133.200000001118
    },
    {
        "pox": 1071,
        "poy": 806,
        "total": 4140.60000000149
    },
    {
        "pox": 1074,
        "poy": 806,
        "total": 4149.10000000149
    },
    {
        "pox": 1077,
        "poy": 806,
        "total": 4158.60000000149
    },
    {
        "pox": 1081,
        "poy": 806,
        "total": 4164.9000000003725
    },
    {
        "pox": 1085,
        "poy": 806,
        "total": 4172.800000000745
    },
    {
        "pox": 1089,
        "poy": 806,
        "total": 4180.800000000745
    },
    {
        "pox": 1092,
        "poy": 806,
        "total": 4188.700000001118
    },
    {
        "pox": 1096,
        "poy": 806,
        "total": 4196.700000001118
    },
    {
        "pox": 1100,
        "poy": 806,
        "total": 4204.5
    },
    {
        "pox": 1104,
        "poy": 806,
        "total": 4212.9000000003725
    },
    {
        "pox": 1109,
        "poy": 806,
        "total": 4221
    },
    {
        "pox": 1112,
        "poy": 806,
        "total": 4228.800000000745
    },
    {
        "pox": 1115,
        "poy": 806,
        "total": 4236.4000000003725
    },
    {
        "pox": 1119,
        "poy": 806,
        "total": 4244.60000000149
    },
    {
        "pox": 1121,
        "poy": 806,
        "total": 4253.10000000149
    },
    {
        "pox": 1123,
        "poy": 805,
        "total": 4261.4000000003725
    },
    {
        "pox": 1125,
        "poy": 804,
        "total": 4269.10000000149
    },
    {
        "pox": 1126,
        "poy": 804,
        "total": 4277.4000000003725
    },
    {
        "pox": 1127,
        "poy": 804,
        "total": 4285.200000001118
    },
    {
        "pox": 1128,
        "poy": 804,
        "total": 4292.5
    },
    {
        "pox": 1130,
        "poy": 803,
        "total": 4300.5
    },
    {
        "pox": 1132,
        "poy": 803,
        "total": 4308.60000000149
    },
    {
        "pox": 1133,
        "poy": 802,
        "total": 4316.4000000003725
    },
    {
        "pox": 1134,
        "poy": 802,
        "total": 4325.300000000745
    },
    {
        "pox": 1135,
        "poy": 802,
        "total": 4332.60000000149
    },
    {
        "pox": 1135,
        "poy": 801,
        "total": 4341.300000000745
    },
    {
        "pox": 1136,
        "poy": 801,
        "total": 4357
    },
    {
        "pox": 1136,
        "poy": 800,
        "total": 4365
    },
    {
        "pox": 1137,
        "poy": 800,
        "total": 4373.300000000745
    },
    {
        "pox": 1138,
        "poy": 800,
        "total": 4404.700000001118
    },
    {
        "pox": 1140,
        "poy": 800,
        "total": 8674.800000000745
    },
    {
        "pox": 1144,
        "poy": 799,
        "total": 8682.300000000745
    },
    {
        "pox": 1151,
        "poy": 797,
        "total": 8694.60000000149
    },
    {
        "pox": 1158,
        "poy": 795,
        "total": 8699.200000001118
    },
    {
        "pox": 1166,
        "poy": 793,
        "total": 8706.5
    },
    {
        "pox": 1174,
        "poy": 791,
        "total": 8714.5
    },
    {
        "pox": 1181,
        "poy": 789,
        "total": 8722.700000001118
    },
    {
        "pox": 1188,
        "poy": 788,
        "total": 8730.700000001118
    },
    {
        "pox": 1194,
        "poy": 787,
        "total": 8738.900000000373
    },
    {
        "pox": 1199,
        "poy": 786,
        "total": 8747.300000000745
    },
    {
        "pox": 1203,
        "poy": 786,
        "total": 8754.5
    },
    {
        "pox": 1207,
        "poy": 785,
        "total": 8763
    },
    {
        "pox": 1211,
        "poy": 785,
        "total": 8771.200000001118
    },
    {
        "pox": 1215,
        "poy": 785,
        "total": 8778.800000000745
    },
    {
        "pox": 1217,
        "poy": 785,
        "total": 8787.800000000745
    },
    {
        "pox": 1220,
        "poy": 785,
        "total": 8794.60000000149
    },
    {
        "pox": 1222,
        "poy": 785,
        "total": 8803
    },
    {
        "pox": 1223,
        "poy": 785,
        "total": 8811.200000001118
    },
    {
        "pox": 1225,
        "poy": 785,
        "total": 8818.5
    },
    {
        "pox": 1226,
        "poy": 785,
        "total": 8826.700000001118
    },
    {
        "pox": 1228,
        "poy": 785,
        "total": 8835.200000001118
    },
    {
        "pox": 1230,
        "poy": 785,
        "total": 8843.10000000149
    },
    {
        "pox": 1231,
        "poy": 785,
        "total": 8859.300000000745
    },
    {
        "pox": 1232,
        "poy": 784,
        "total": 8994.900000000373
    },
    {
        "pox": 1233,
        "poy": 783,
        "total": 9011.60000000149
    },
    {
        "pox": 1234,
        "poy": 781,
        "total": 9019.200000001118
    },
    {
        "pox": 1234,
        "poy": 780,
        "total": 9026.800000000745
    },
    {
        "pox": 1235,
        "poy": 778,
        "total": 9035
    },
    {
        "pox": 1236,
        "poy": 775,
        "total": 9044.700000001118
    }
];


function simulateMovement (incomingObject, location) {


    setTimeout(()=> {
        let coordX = 0; // Moving from the left side of the screen
        // let coordY = 500; // Moving in the center
        location === "end" ? coordX = incomingObject.length-1: coordX = 0;

        function move() {
            console.log("moving");
    
            // Move step = 1 array element
            // coordX += 1;
            location === "end" ? coordX -= 1 : coordX += 1;

            console.log("moving1");
            console.log("coordX", coordX);
            // Create new mouse event
            let ev = new MouseEvent("mousemove", {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: incomingObject[coordX].pox,
                clientY: incomingObject[coordX].poy
            });

            console.log("moving2");

        
            // Send event
            document.querySelector('#mainContent').dispatchEvent(ev);

            //make the animation smoother by repeating it again (slight movement)
            let factor
            location === "end" ? factor = -0.3 : factor = 0.3;
            setTimeout(() => {
                let ev2 = new MouseEvent("mousemove", {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    clientX: incomingObject[coordX].pox+factor,
                    clientY: incomingObject[coordX].poy+factor
                });
            
                // Send event
                    document.querySelector('#mainContent').dispatchEvent(ev2);
            }, incomingObject[coordX].total/3000);

            console.log("moving3");



            // If the current position of the fake "mouse" is less than the width of the screen - let's move
            // if (coordX < window.innerWidth) {
            // repeat the function again and move to next position
            // with a delay factor from the record simulating user mouse speed delay

            let animaionEnd = false;
            location === "end" ? animaionEnd = (coordX === 0) : animaionEnd = (coordX >= incomingObject.length-1);

            console.log("moving4", animaionEnd);


            if (!animaionEnd) {
                setTimeout(() => {
                    move();
                    //the more speed the faster and less pressure
                }, incomingObject[coordX].total/3000);
            }
      
        }
        
        // Starting to move
        move();
      }, 1000);    
}


// pass the object to the function
// simulateMovement(obj2, "start");
setTimeout(()=> {
    // simulateMovement(obj2, "end");
}, 2300);


// original function
// https://stackoverflow.com/questions/41143263/trigger-mousemove-event-using-jquery-or-javascript
/*
let coordX = 0; // Moving from the left side of the screen
let coordY = window.innerHeight / 2; // Moving in the center

function move() {
    // Move step = 20 pixels
    coordX += 20;
    // Create new mouse event
    let ev = new MouseEvent("mousemove", {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: coordX,
        clientY: coordY
    });

    // Send event
    document.querySelector('Put your element here!').dispatchEvent(ev);
    // If the current position of the fake "mouse" is less than the width of the screen - let's move
    if (coordX < window.innerWidth) {
        setTimeout(() => {
            move();
        }, 10);
    }
}

// Starting to move
move();
*/




return {simulateMovement, multipleSplats};
}