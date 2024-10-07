"use client"
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import {ScrollTrigger} from "gsap/all";
import Image from "next/image";


// https://codepen.io/GreenSock/pen/eYpGLYL

const Page = () => {

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(()=> {
        
        let initialSkew = { skew: 0 },                                                  //(2)
        skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"), // fast             //(1)
        clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees.  //(3)

        ScrollTrigger.create({
            onUpdate: (self) => {
                let skew = clamp(self.getVelocity() / -300);                            //(3)
                // only do something if the skew is MORE severe. 
                // Remember, we're always tweening back to 0, 
                // so if the user slows their scrolling quickly, 
                // it's more natural to just let the tween handle that smoothly 
                // rather than jumping to the smaller skew.
                if (Math.abs(skew) > Math.abs(initialSkew.skew)) {                      //(2)
                    initialSkew.skew = skew;                                            //(2)
                    gsap.to(initialSkew, {                                              //(2)
                        skew: 0, 
                        duration: 0.8, 
                        ease: "power3", 
                        overwrite: true, 
                        onUpdate: () => skewSetter(initialSkew.skew)                    //(1)
                    });
                }
        }
    });
    
     
    gsap.set(".skewElem", {
        transformOrigin: "right center", // make the right edge "stick" to the scroll bar
        force3D: true   // force3D: true improves performance
    });


    },[]);


  return (
    <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row gap-8 my-8">
            <Image src="https://picsum.photos/600/600?random=1"
            height="600" width="600" className="skewElem" alt="image"></Image>
            <Image src="https://picsum.photos/600/600?random=2"
            height="600" width="600" className="skewElem" alt="image"></Image>
        </div>

        <div className="flex flex-row gap-8 my-8">
            <Image src="https://picsum.photos/600/600?random=3"
            height="600" width="600" className="skewElem" alt="image"></Image>
            <Image src="https://picsum.photos/600/600?random=4"
            height="600" width="600" className="skewElem" alt="image"></Image>
        </div>


        <div className="flex flex-row gap-8 my-8">
            <Image src="https://picsum.photos/600/600?random=5"
            height="600" width="600" className="skewElem" alt="image"></Image>
            <Image src="https://picsum.photos/600/600?random=6"
            height="600" width="600" className="skewElem" alt="image"></Image>
        </div>

        <div className="flex flex-row gap-8 my-8">
            <Image src="https://picsum.photos/600/600?random=7"
            height="600" width="600" className="skewElem" alt="image"></Image>
            <Image src="https://picsum.photos/600/600?random=8"
            height="600" width="600" className="skewElem" alt="image"></Image>
        </div>

        <div className="flex flex-row gap-8 my-8">
            <Image src="https://picsum.photos/600/600?random=9"
            height="600" width="600" className="skewElem" alt="image"></Image>
            <Image src="https://picsum.photos/600/600?random=10"
            height="600" width="600" className="skewElem" alt="image"></Image>
        </div>

    </div>
  )
}

export default Page