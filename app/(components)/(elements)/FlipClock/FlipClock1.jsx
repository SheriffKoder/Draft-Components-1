"use client"
import React, { useEffect } from 'react'
import Tick from '@pqina/flip';
import '@pqina/flip/dist/flip.min.css';
import "./FlipClock.css"


const FlipClock1 = () => {


    useEffect(()=> {
        // see Tick API in console
        // console.log(Tick);

        // create visual counter
        Tick.DOM.create(document.querySelector('.tick'), {
        didInit: function (tick) {
            // get current year 
            const currentYear = new Date().getFullYear();
            // create the countdown counter
            var counter = Tick.count.down(`${currentYear}-05-14 03:00:00`);

            counter.onupdate = function (value) {
            // console.log('onupdate', value);
            tick.value = value;
            };

            counter.onended = function () {
            console.log('onended');
            };

            console.log('initialized');
        },
        });
    },[])


  return (
    <>
        <div className="tick">
        <div
            data-repeat="true"
            data-layout="horizontal fit"
            data-transform="preset(d, h, m, s) -> delay"
        >
            <div className="tick-group">
            <div
                data-key="value"
                data-repeat="true"
                data-transform="pad(00) -> split -> delay"
            >
                <span data-view="flip"></span>
            </div>

            <span data-key="label" data-view="text" className="tick-label"></span>
            </div>
        </div>
        </div>

        <div className="tick-onended-message" style={{display: "none"}}>
            <p>Time's up</p>
        </div>

    </>
  )
}

export default FlipClock1
