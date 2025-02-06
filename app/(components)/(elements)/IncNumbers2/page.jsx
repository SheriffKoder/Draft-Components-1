"use client"
import React, { useEffect } from 'react'
import "./FlipClock2.css"



const Page = () => {

  function Counter(selector, settings){
    this.settings = Object.assign({
      digits: 5,
      delay: 250, // ms
      direction: ''  // ltr is default
    }, settings||{})
    
    var scopeElm = document.querySelector(selector)
    
    // generate digits markup
    var digitsHTML = Array(this.settings.digits + 1).join('<div><b data-value="0"></b></div>')
    scopeElm.innerHTML = digitsHTML;
  
    this.DOM = {
      scope : scopeElm,
      digits : scopeElm.querySelectorAll('b')
    }
    
    this.DOM.scope.addEventListener('transitionend', e => {
      if (e.pseudoElement === "::before" && e.propertyName == 'margin-top'){
        e.target.classList.remove('blur')
      }
    })
    
    this.count()
  }
  
Counter.prototype.count = function(newVal){
  var countTo, className, 
      settings = this.settings,
      digitsElms = this.DOM.digits;
  
  // update instance's value
  this.value = newVal || this.DOM.scope.dataset.value|0

  if( !this.value ) return;
  
  // convert value into an array of numbers
  countTo = (this.value+'').split('')
  
  if(settings.direction == 'rtl'){
    countTo = countTo.reverse()
    digitsElms = [].slice.call(digitsElms).reverse()
  }
  
  // loop on each number element and change it
  digitsElms.forEach(function(item, i){ 
      if( +item.dataset.value != countTo[i]  &&  countTo[i] >= 0 )
        setTimeout(function(j){
            var diff = Math.abs(countTo[j] - +item.dataset.value);
            item.dataset.value = countTo[j]
            if( diff > 3 )
              item.className = 'blur1';
        }, i * settings.delay, i)
  })
}
  


function randomCount(){
  counter.count( getRandomNum(0, 9999999))
}

function getRandomNum(min,max){
    return Math.floor(Math.random()*(max-min+1) + min)
}
  useEffect(()=> {
    let counter = new Counter('.numCounter', {direction:'rtl', delay:100, digits:4})
    // setInterval(randomCount, 3000);
  }, [])

  return (
    <div className='flex h-[100vh] items-center justify-center bg-white'>
      <div class='numCounter' data-value='1234'></div>

    </div>
  )
}

export default Page
