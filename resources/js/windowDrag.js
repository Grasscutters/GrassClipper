// https://stackoverflow.com/questions/67971689/positioning-the-borderless-window-in-neutralino-js
// had to use this since the in-built function breaks the close and minimize buttons
let dragging = false, posX, posY;
let draggable; 

document.addEventListener('DOMContentLoaded', () => {
  draggable = document.getElementById('controlBar');

  // Listen to hovers
  draggable.onmousedown = function (e) {
    posX = e.pageX, posY = e.pageY;
    dragging = true;
  }
  
  draggable.onmouseup = function (e) {
    dragging = false;
  }
  
  document.onmousemove = function (e) {
    if (dragging) Neutralino.window.move(e.screenX - posX, e.screenY - posY);
  }
})