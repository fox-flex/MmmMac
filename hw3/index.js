/* YOUR CODE HERE! */
// let boxes = document.getElementsByClassName("box");
const boxContainer = document.querySelector(".box-container");
const container = document.getElementsByClassName('box-container')[0]

let BOX_ID = 2;

function getNumOfBoxes() {
    return document.getElementsByClassName('box').length;
}
let runDrag = false;
let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

container.addEventListener('mousedown', (ev) => {
    console.log(`num boxes  - ${getNumOfBoxes()}`)
    let box = ev.target;

    if (box && box.className === 'box' || box.className === 'box box-large') {
        if (ev.button === 0) { // left click
            if (ev.shiftKey) {
                resizeHandler(box);
            } else if (ev.ctrlKey) {     // for debug on touchpad
                changeColorHandler(box); // for debug
            } else {
                runDrag = true;
            }
        // } else if (ev.button === 2) { // right click
        //         changeColorHandler(box);
        }
    }
})

container.addEventListener('onmouseup', (ev) => {
    if (runDrag) {
        pos1 = 0; pos2 = 0; pos3 = 0; pos4 = 0;
        runDrag = false;
    }
})

container.addEventListener('onmousemove', (ev) => {
    let box = ev.target;

    if (runDrag && box && box.className === 'box' || box.className === 'box box-large') {
        if (ev.button === 0) { // left click
            move(box);
        }
    }
})

container.addEventListener('dblclick', (ev) => {
    let box = ev.target;
    console.log('1');
    if (box && box.className === 'box' || box.className === 'box box-large') {
        console.log('2');
        if (ev.button === 0) { // left click
            if (ev.altKey) {
                eraseHandler(box);
            } else if (!ev.shiftKey && !ev.shiftKey && !ev.ctrlKey) {
                duplicateHandler(box);
            }
        }
    }
})


function resizeHandler(el) {
    // el.toggle('box-large');
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
    // buildCoolBox(new_el);
    // boxes = document.getElementsByClassName("box");
}

function eraseHandler(el) {
    if (getNumOfBoxes() > 1) {
        el.parentNode.removeChild(el);
    }
}

function move(el) {
    // calculate the new cursor position:
    pos1 = pos3 - el.clientX;
    pos2 = pos4 - el.clientY;
    pos3 = el.clientX;
    pos4 = el.clientY;
    // set the element's new position:
    el.style.top = (el.offsetTop - pos2) + "px";
    el.style.left = (el.offsetLeft - pos1) + "px";
}

