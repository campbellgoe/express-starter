/*@preserve eslint no-console: ["warn", { allow: ["warn", "error"] }] */
(function() {
  "use strict";
 /* //requestAnimationFrame polyfill
  require('./polyfill-requestAnimationFrame.js')();
  //hypotenuse polyfill
  Math.hypot = Math.hypot || require('./polyfill-hypotenuse.js');
  //Object.keys polyfill
  Object.keys = Object.keys || require('./polyfill-Object.keys.js')();

  let cube = require('./cube.js');

  let ease = require('./ease.js');

  let looping = false;*/
  function initialize(){
   /* function onResize(){

    }
    function onScroll(){

    }
    window.addEventListener('resize', onResize, false);
    document.addEventListener('scroll', onScroll, false);
    console.log(`5 cubed is ${cube(5)}`);//this console log throws lint error*/
  }
/*
  function update(){
    
  }
  function draw(){

  }
  function loop(){
    if(looping){
      update();
      draw();
      requestAnimationFrame(loop);
    }
  }*/
  document.addEventListener('DOMContentLoaded', initialize, false);
  })();