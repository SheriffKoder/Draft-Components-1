// Ensure this runs only in the browser
if (typeof window !== "undefined") {
    // HELPER FUNCTIONS
  
    function htmlEscape(string) {
      return string
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }
  
    function html(strings, ...args) {
      return strings
        .map((str, i) =>
          i < args.length
            ? str +
              (args[i].__html
                ? [].concat(args[i].__html).join("")
                : htmlEscape(String(args[i])))
            : str
        )
        .join("")
        .trim();
    }
  
    function toDigits(num, size = 0) {
      if (Number.isNaN(num)) return [];
      const padded = num.toString().padStart(size, "0");
      const withCommas = padded.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return withCommas.split(""); // Ensure this returns the full array with commas
    }
  
    function toSize(num) {
      return Number.isNaN(num) ? 0 : num.toString().length;
    }
  
    function renderStyles() {
      return html`
        <style>
          :host {
            --roll-duration: 1s;
          }
          .digit, .comma {
            width: 1ch;
            overflow: hidden;
            display: inline-flex;
            position: relative;
          }
          .comma {
            color: inherit;
            text-align: center;
          }
          .value {
            color: white;
            position: relative;
          }
          .scale {
            user-select: none;
            position: absolute;
            left: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            transition: transform var(--roll-duration);
          }
        </style>
      `;
    }
  
    function renderDigit(value, index) {
      if (value === ",") {
        return html`<span class="comma" aria-hidden="true">${value}</span>`;
      }
      return html`
        <span class="digit" data-value="${value}" id="digit${index}">
          <span class="scale" aria-hidden="true">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>-</span>
          </span>
          <span class="value">${value}</span>
        </span>
      `;
    }
  
    function renderRoot() {
      return html`
        ${{ __html: renderStyles() }}
        <span id="wrapper"> </span>
      `;
    }
  
    function render($wrapper, nextState, prevState) {
      const { value, size } = nextState;
      if (size > prevState.size) {
        $wrapper.innerHTML = toDigits(NaN, size).map(renderDigit).join("");
        setTimeout(() => {
          render($wrapper, nextState, { ...prevState, size });
        }, 23);
      } else {
        toDigits(value, size).forEach((digit, index) => {
          const $digit = $wrapper.querySelector(`#digit${index}`);
          if ($digit) {
            if (digit === ",") {
              $digit.textContent = digit; // Static comma
            } else {
              $digit.dataset.value = digit;
              $digit.querySelector(".value").textContent = digit;
            }
          }
        });
      }
    }
  
    const INTERNAL = Symbol("INTERNAL");
  
    class RollingNumber extends HTMLElement {
      static get observedAttributes() {
        return ["value"];
      }
  
      [INTERNAL] = {
        $wrapper: null,
        state: { value: NaN, size: 0 },
        update(payload) {
          if ("value" in payload) {
            const { value } = payload;
            const size = toSize(value);
            const state = { ...this.state, value };
            const nextState = size > this.state.size ? { ...state, size } : state;
            render(this.$wrapper, nextState, this.state);
            this.state = nextState;
          }
        },
      };
  
      constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = renderRoot();
        this[INTERNAL].$wrapper = shadow.getElementById("wrapper");
      }
  
      get value() {
        return this[INTERNAL].state.value;
      }
  
      set value(value) {
        const numericValue = Number.parseInt(value.toString().replace(/,/g, ""), 10);
        this[INTERNAL].update({ value: numericValue });
      }
  
      attributeChangedCallback(name, _, newValue) {
        if (name === "value") {
          this.value = newValue; // Trigger the setter when the value attribute changes
        }
      }
  
      connectedCallback() {
        if (this.isConnected) {
          const input = this.getAttribute("value") || this.textContent;
          const value = Number.parseInt(input);
          this[INTERNAL].update({ value });
        }
      }
    }
  
    customElements.define("layflags-rolling-number", RollingNumber);
  }
  