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

function addDrag(el) {
    console.log('12');
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    el.addEventListener('onmousedown', dragMouseDown)
    el.onmousedown = dragMouseDown;

    function dragMouseDown(ev) {
        console.log('start drag');

        ev = ev || window;
        // e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = ev.clientX;
        pos4 = ev.clientY;

        el.addEventListener('onmouseup', closeDragElement)
        el.addEventListener('onmousemove', elementDrag)
    }

    function elementDrag(ev) {
        console.log('doodododo drag');

        ev = ev || window;
        // e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - ev.clientX;
        pos2 = pos4 - ev.clientY;
        pos3 = ev.clientX;
        pos4 = ev.clientY;
        // set the element's new position:
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
    }

    function closeDragElement(ev) {
        // stop moving when mouse button is released:
        el.removeEventListener('onmouseup', closeDragElement)
        el.removeEventListener('onmousemove', elementDrag)
        console.log('delete all')
        // document.onmouseup = null;
        // document.onmousemove = null;
        // el.onmouseup = null;
        // el.onmousemove = null;
    }
}