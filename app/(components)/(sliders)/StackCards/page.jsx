"use client"
import React from 'react'
import './StackCards.css'
import { gsap } from "gsap";
import { ScrollScene} from 'scrollscene';
import { useGSAP } from '@gsap/react';

const StackCards = () => {



// Register gsap effect
// --------------------------------
  gsap.registerEffect({
      name: "scaleDown",
      effect: (targets, config) => {
        return gsap.to(targets, {
          ease: config.ease,
          scale: .7,
          y: -20,
        });
      },
      defaults: {
        ease: 'power1.out'
      },
      extendTimeline: true
  });
    

  useGSAP(()=> {
    // Creating a card scene
    // --------------------------------
    function CreateCardsScene(el) {  
      return new ScrollScene({
        triggerElement: el.nextElementSibling,
        offset: -150,
        triggerHook: .5,
        gsap: {
          timeline: stackedCardsTl(el),
        },
        duration: '100%',
      })
    }
    
    // Scale down timeLine
    // --------------------------------
    function stackedCardsTl(el) {
      const timeline = gsap.timeline({ paused: true });
      timeline
        .addLabel('in')
        .scaleDown(el)
      return timeline;
    }
    
    
    // Creating scens and binding tweens to all cards
    // ------------------------------------------------
    function stackedCards(cardClassName) {
      const cards = document.querySelectorAll(cardClassName);
      for (let index = 0; index < cards.length-1; index++) {
        CreateCardsScene(cards[index]);
      }
    }
    
    
    // Stacked cards init
    // -----------------------------
    stackedCards('.card');
  },[])
  




  return (
    <div>
        <section className="intro"></section>
        <div className="cards">
            <div className="card card-1">
                <div className="card-inner">
                    <h2>Fa, si, la, chantez. Les chansons affichent leurs paroles.</h2>
                    <div className="mockup"></div>
                </div>
            </div>
            <div className="card card-2">
                <div className="card-inner">
                    <h2>Écoutez en live des stations de radio locales du monde entier.</h2>
                    <div className="mockup"></div>
                </div>
            </div>
            <div className="card card-3">
                <div className="card-inner">
                    <h2>Téléchargez et écoutez de la musique directement sur votre Apple Watch, sans votre iPhone.</h2>
                    <div className="mockup"></div>
                </div>
            </div>
            <div className="card card-4">
                <div className="card-inner">
                    <h2>Profitez d’Apple Music en voiture avec CarPlay.</h2>
                    <div className="mockup"></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StackCards
