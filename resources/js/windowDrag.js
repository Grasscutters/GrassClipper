// https://stackoverflow.com/questions/67971689/positioning-the-borderless-window-in-neutralino-js
// had to use this since the in-built function breaks the close and minimize buttons
let dragging = false, ratio = 1, posX, posY
let draggable 

document.addEventListener('DOMContentLoaded', async () => {
    draggable = document.getElementById('controlBar')

    // Listen to hovers
    draggable.onmousedown = function (e) {
        ratio = window.devicePixelRatio

        posX = e.pageX * ratio, posY = e.pageY * ratio
        dragging = true
    }
  
    // Patch for monitors with scaling enabled, allows them to detach from the titlebar anywhere
    window.onmouseup = function (e) {
        dragging = false
    }
  
    document.onmousemove = function (e) {
        if (dragging) Neutralino.window.move(e.screenX * ratio - posX, e.screenY * ratio - posY)
    }
})