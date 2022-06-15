/* YOUR CODE HERE! */
let boxes = document.getElementsByClassName("box");
const container = document.querySelector(".box-container");

let BOX_ID = 2;

buildCoolBox(boxes[0]);


function resizeHandler(el) {
    el.classList.toggle('box-large');
}

function duplicateHandler(el) {
    let new_el = el.cloneNode(true);
    new_el.textContent = BOX_ID;
    BOX_ID += 1;
    console.log(el.offsetTop + el.clientHeight + 'px')
    new_el.style.top = el.offsetTop + el.clientHeight + 'px';
    new_el.style.left = el.offsetLeft + el.clientWidth + 'px';
    container.appendChild(new_el);
    buildCoolBox(new_el);
    boxes = document.getElementsByClassName("box");
}

function changeColorHandler(el) {
    const colors = ['blue', 'yellow', 'red', 'black'];
    const colNum = colors.length;

    let ind_new = Math.floor( Math.random() * colNum);
    if (el.style.background === colors[ind_new]) {
        ind_new = (ind_new+1) % colNum;
    }
    el.style.backgroundColor = colors[ind_new];
}

function eraseHandler(el) {
    if(boxes.length > 1) {
        el.parentNode.removeChild(el);
        boxes = document.getElementsByClassName("box");
    }
}

/* src: https://www.w3schools.com/howto/howto_js_draggable.asp */
let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
function dragHandler(el) {
    el.onmousedown = dragMouseDown;

    function dragMouseDown(el) {
        el = el || window;
        el.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = el.clientX;
        pos4 = el.clientY;
        el.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        el.onmousemove = elementDrag;
      }

    function elementDrag(el) {
        el = el || window;
        el.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - el.clientX;
        pos2 = pos4 - el.clientY;
        pos3 = el.clientX;
        pos4 = el.clientY;
        // set the element's new position:
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
    }

    function closeDragElement(el) {
        // stop moving when mouse button is released:
        el.onmouseup = null;
        el.onmousemove = null;
    }
}

function buildCoolBox(box) {
    box.addEventListener('mousedown', (ev) => {
        if (ev.button === 0) { // left click
            if (ev.shiftKey) {
                resizeHandler(box);
            } else {
                // pos1 = 0; pos2 = 0; pos3 = 0; pos4 = 0;
                dragHandler(box);
            }
        // } else if (ev.button === 2) { // right click
        } if (ev.ctrlKey) { // for debug on touchpad
            changeColorHandler(box);
        }
    });

    box.addEventListener('dblclick', (ev) => {
        if (ev.button === 0) { // left click
            if (ev.altKey) {
                eraseHandler(box);
            } else if (!ev.shiftKey && !ev.shiftKey && !ev.ctrlKey) {
                duplicateHandler(box);
            }
        }
    })
}
