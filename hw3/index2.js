/* YOUR CODE HERE! */
let boxes = document.getElementsByClassName("box");
const boxContainer = document.querySelector(".box-container");
const container = document.getElementsByClassName('box-container')[0]

let BOX_ID = 2;

// [...boxes].forEach( box => { addDrag(box); });
[...boxes].forEach( box => { addDrag(box); });

function getNumOfBoxes() {
    return document.getElementsByClassName('box').length;
}

function doForBoxes(type, func) {
    container.addEventListener(type, (ev) => {
        let box = ev.target
        if (box && box.className === 'box'
            || box.className === 'box box-large') {
            func(ev, box);
        }
    });
}

doForBoxes('contextmenu', (ev, box) => {
    changeColorHandler(box);
});

doForBoxes('click', (ev, box) => {
    if (ev.shiftKey) {
        resizeHandler(box);
    }
});

doForBoxes('dblclick', (ev, box) => {
    if (ev.button === 0) { // left click
        if (ev.altKey) {
            eraseHandler(box);
        } else if (!ev.shiftKey && !ev.shiftKey && !ev.ctrlKey) {
            duplicateHandler(box);
        }
    }
})

// doForBoxes('mousedown', (ev, box) => {
//     console.log(`num boxes  - ${getNumOfBoxes()}`)
//     if (ev.button === 0) { // left click
//         if (ev.shiftKey) {
//             resizeHandler(box);
//         } else if (ev.ctrlKey) {     // for debug on touchpad
//             changeColorHandler(box); // for debug
//         } else {
//             // runDrag = true;
//         }
//         // } else if (ev.button === 2) { // right click
//         //         changeColorHandler(box);
//     }
// });

function resizeHandler(el) {
    el.classList.toggle('box-large');
}

function changeColorHandler(el) {
    const colors = ['blue', 'yellow', 'red', 'black'];
    const colNum = colors.length;

    let ind_new = Math.floor(Math.random() * colNum);
    if (el.style.background === colors[ind_new]) {
        ind_new = (ind_new + 1) % colNum;
    }
    el.style.backgroundColor = colors[ind_new];
}

function duplicateHandler(el) {
    let new_el = el.cloneNode(true);
    new_el.textContent = BOX_ID;
    BOX_ID += 1;
    console.log(el.offsetTop + el.clientHeight + 'px')
    new_el.style.top = el.offsetTop + el.clientHeight + 'px';
    new_el.style.left = el.offsetLeft + el.clientWidth + 'px';
    boxContainer.appendChild(new_el);
    addDrag(new_el);
    // buildCoolBox(new_el);
    // boxes = document.getElementsByClassName("box");
}

function eraseHandler(el) {
    if (getNumOfBoxes() > 1) {
        el.parentNode.removeChild(el);
    }
}

function addDrag (element) {
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
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
