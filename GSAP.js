

// Ease Types
// ease: "power2.out"
// ease: "bounce.out"
// ease: Power4.easeInOut, // import { Power4 } from "gsap";
// ease: "power3.inOut"
// ease: "elastic.out(1,0.3)",
// ease: easeOut,

// Functions
// onComplete, onStart, onUpdate, onReverseComplete, onReverseStart, onReverseUpdate, onReverseEnd



//// GSAP Timelines - button click, this on a state triggerd useEffect
//// Timeline to animate 2 objects at the same time 
/*

const tl = gsap.timeline()

// synced timings
// Press down - button goes to -0.1, icon goes to -0.04
tl.to(buttonRef.current.position, {
  z: -0.1,
  duration: 0.1,
  ease: "power2.out"
})
.to(iconRef.current?.position, {
  z: -0.04,
  duration: 0.1,
  ease: "power2.out"
}, 0) // Start at the same time as button

// Release - both return to original positions
.to(buttonRef.current.position, {
  z: 0,
  duration: 0.15,
  ease: "bounce.out"
})
.to(iconRef.current?.position, {
  z: 0.05,
  duration: 0.15,
  ease: "bounce.out"
}, "-=0.15") // Start at the same time as button release

*/


/////////////////////////////////////////////////////////
// Timelines with scrollTrigger
/*
 const tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".section3",
        start: "top 20%",
        end: "50% top",
        // markers: true,
    }
})

tl3.add("Section3_2")
.to("#sectionThreeHeader", {
    translateY: -75,
    duration: 2.5,
    ease: "elastic.out(1,0.3)",
    delay: 0,
}, "Section3_2")
.to("#sectionThreeCardsContainer", {
    translateY: 0,
    opacity: 1,
    duration: 0.5,
    ease: easeOut,
    delay: 0,
}, "Section3_2")

*/






// Scroll to section
/*

gsap.to(window, {
  duration: 1.5,
  scrollTo: {
    y: `#${sectionId}`,
    offsetY: 0
  },
  ease: "power3.inOut",
  onStart: () => console.log("GSAP scroll animation started"),
  onComplete: () => console.log("GSAP scroll animation completed")
});


*/


// Transition based on state without using GSAP
// className={`transition-opacity duration-1000 ${showItems ? 'opacity-100' : 'opacity-0'}`}



// From and to in the same block, 
/*
if (sectionTwoRef.current) {
    gsap.fromTo(sectionTwoRef.current, 
    // From
      {
        opacity: 0
      },
    // To
      {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          setSectionVisible(true)
        }
      }
    )
  }
*/

/////////////////////////////////////////////////////////
// Videos
/*
anim = gsap.to(videoElement)
onUpdate, onComplete, anim.progress, anim.restart
where the progress is videoRef.current[videoId].currentTime / duration

move/restart the video with gsap
animated video progress by gsap
*/

////// GSAP - base
/*

// animate a box to something
Drafts-1 > sss > contents.js Lesson1:

@AppleDraft/highlights /////////////////
gsap.to(refArray.current[id]) // gsap on one of the elements by its ref

gsap.to with width dynamic
but have to gsap.ticker.add/remove to update animation (progress)


into view scroll trigger

*/


// Bounding Recs
/*

// Initial check
handleScroll();

// Add scroll listener
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);


/////////////////////////////////


const xTo = gsap.quickTo(element, "x", {duration: 1, ease: "elastic.out(1, 0.3)"})
const yTo = gsap.quickTo(element, "y", {duration: 1, ease: "elastic.out(1, 0.3)"})

const mouseMove = (e) => {
    const { clientX, clientY } = e;
    const {height, width, left, top} = element.getBoundingClientRect();
    const x = clientX - (left + width/2)
    const y = clientY - (top + height/2)
    xTo(x) // xTo(0)
    yTo(y) // yTo(0)
}


// Uses React.cloneElement to inject the ref into whatever child component is passed in.
return (
    <div>
        {React.cloneElement(children, {ref:ref})}
    </div>
)

<MagneticButton>
    <button>Click me!</button>
</MagneticButton>




*/

////// Scroll Triggers without GSAP - Intersection Observer
/*

  const [isHeadingVisible, setIsHeadingVisible] = useState(false)
  const headingRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeadingVisible(entry.isIntersecting)
      },
      { threshold: 0.1 } // Trigger when at least 10% of the element is visible
    )

    if (headingRef.current) {
      observer.observe(headingRef.current)
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current)
      }
    }
  }, [])

  useEffect with isHeading visible
  add to a div the ref of headingRef

*/

///// Scroll Triggers without GSAP - bounding recs
/*

// Trigger animation when component mounts or based on scroll position
// rect.top = distance from viewport top to element's top edge
// rect.bottom = distance from viewport top to element's bottom edge

useEffect(() => {
const handleScroll = () => {
    const section = document.getElementById('section3');
    if (section) {
    const rect = section.getBoundingClientRect(); // returns the element's position relative to the viewport
    if (rect.top < window.innerHeight && rect.bottom > 0) { // element's top edge is above the bottom of the screen and element's bottom edge is below the top of the screen
        setShowDonut(true);
    }
    }
};


*/

/////////////////////////////////////////////////////////
// Scroll trigger set state
/*

  // Create a ScrollTrigger that updates the isHeadingVisible state
  ScrollTrigger.create({
    trigger: ".container2",
    start: "top 60%",
    end: "top top",
    // markers: true,
    onEnter: () => setIsHeadingVisible(true),
    // Only trigger in forward direction - don't reset when scrolling back up
    // onLeaveBack: () => setIsHeadingVisible(false),
  });

*/

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

//// Scroll Triggers
/////////////////////////////////////////////////////////

/*
gsap.to(target, {
    ...animationProps,      // if needed
    scrollTrigger: {
        trigger: target,
        toggleActions: "restart reverse restart reverse",           //enter leave enter-back leave-back
        start: "top 85%",           //bottom top
        ...scrollProps,
    }
})
*/




// Scroll trigger animate
/*

gsap.set("#sectionTwo_header", {
  opacity: 0,
  y: 50
})

gsap.to("#sectionTwo_header", {
  scrollTrigger: {
      trigger: ".container2",
      // scrub: true,
      start: "top 60%",
      end: "top top",
      // markers: true,

    },
  y: 0, //normal value
  opacity: 1,
  duration: 0.5,
  delay: 0,
  ease:  easeOut,
});

also
*/


// Add animation for the "+" signs
/*
gsap.to(".animated-plus", {
    opacity: 1,
    duration: 0.3,
    delay: 1, // Adjust this delay to match when your numbers finish animating
    scrollTrigger: {
        trigger: ".section3",
        start: "top 20%",
    }
});

*/




/////////////////////////////////////////////////////////
// the show and hide the marginTop of the section to enable the skewed div positioning 
//not to interfere with the h-screen
/*
useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center", // start when the top of fleet hits the bottom of viewport
      end: "top top",      // end when the top of fleet hits the top of viewport
      onEnter: () => {
      // When entering the fleet section from above, remove the margin
      gsap.to(sectionRef.current, { marginTop: 0, duration: 0.5 });
    },
    onLeaveBack: () => {
      // When leaving the fleet section going back up, restore the margin
      gsap.to(sectionRef.current, { marginTop: "6.5rem", duration: 0.5 });
    },
    // markers: true, // uncomment for debugging
  });
  }, [isMounted])
  
    // Set isMounted to true after component mounts (client-side only)
    useEffect(() => {
      setIsMounted(true)
    }, [])
  
  
    <div className='w-full h-screen bg-background flex flex-col relative mt-[6.5rem]'
    ref={sectionRef} id="fleet">
        <div>Skewed div</div>
    </div>
*/