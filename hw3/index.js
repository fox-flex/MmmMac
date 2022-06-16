/* YOUR CODE HERE! */

let currentBoxIndex = 1

// Function below was taken there: https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement (element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;
    // element.addEventListener('onmousedown', dragMouseDown);

    function dragMouseDown (ev) {
        ev = ev || window;
        ev.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = ev.clientX;
        pos4 = ev.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;

        // element.onmouseup = closeDragElement;
        // element.onmousemove = elementDrag;

        // document.addEventListener('onmouseup', closeDragElement)
        // document.addEventListener('onmousemove', elementDrag)
    }

    const elementDrag = (ev) => {
        ev = ev || window;
        ev.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - ev.clientX;
        pos2 = pos4 - ev.clientY;
        pos3 = ev.clientX;
        pos4 = ev.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    const closeDragElement = () => {
        // stop moving when mouse button is released:
        // document.onmouseup = null;
        // document.onmousemove = null;
        document.removeEventListener('onmouseup', closeDragElement)
        document.removeEventListener('onmousemove', elementDrag)
        // element.removeEventListener('onmouseup', closeDragElement)
        // element.removeEventListener('onmousemove', elementDrag)
    }
}

const box = document.getElementsByClassName("box")[0];
dragElement(box);


