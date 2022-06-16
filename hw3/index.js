/* YOUR CODE HERE! */
let boxes = document.getElementsByClassName('box');
const boxContainer = document.querySelector('.box-container');
const container = document.getElementsByClassName('box-container')[0]

let BOX_ID = 2;
window.addEventListener("contextmenu", e => e.preventDefault());

[...boxes].forEach(box => {
    addDrag(box);
});

function getNumOfBoxes() {
    return document.getElementsByClassName('box').length;
}

function decoratorToAddListenerForAllBoxes(type, func) {
    container.addEventListener(type, (ev) => {
        let box = ev.target
        if (box && box.className === 'box'
            || box.className === 'box box-large') {
            func(ev, box);
        }
    });
}

decoratorToAddListenerForAllBoxes('contextmenu', (ev, box) => {
    changeColorHandler(box);
});

decoratorToAddListenerForAllBoxes('click', (ev, box) => {
    if (ev.shiftKey) {
        resizeHandler(box);
    }
});

decoratorToAddListenerForAllBoxes('dblclick', (ev, box) => {
    if (ev.button === 0) { // left click
        if (ev.altKey) {
            eraseHandler(box);
        } else if (!ev.shiftKey && !ev.shiftKey && !ev.ctrlKey) {
            duplicateHandler(box);
        }
    }
})

function resizeHandler(el) {
    el.classList.toggle('box-large');
}

function changeColorHandler(el) {
    const colors = ['blue', 'yellow', 'red', 'black'];
    const colNum = colors.length;

    let indNew = Math.floor(Math.random() * colNum);
    if (el.style.background === colors[indNew]) {
        indNew = (indNew + 1) % colNum;
    }
    el.style.backgroundColor = colors[indNew];
}

function duplicateHandler(el) {
    let newEl = el.cloneNode(true);
    newEl.textContent = BOX_ID;
    BOX_ID += 1;
    newEl.style.top = el.offsetTop + el.clientHeight + 'px';
    newEl.style.left = el.offsetLeft + el.clientWidth + 'px';
    boxContainer.appendChild(newEl);
    addDrag(newEl);
}

function eraseHandler(el) {
    if (getNumOfBoxes() > 1) {
        el.parentNode.removeChild(el);
    }
}

function addDrag(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.addEventListener('mousedown', dragMouseDown, true);

    function dragMouseDown(ev) {
        ev = ev || window;
        // get the mouse cursor position at startup:
        pos3 = ev.clientX;
        pos4 = ev.clientY;
        document.addEventListener('mouseup', closeDragElement);
        document.addEventListener('mousemove', elementDrag);
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
        element.style.top = (element.offsetTop - pos2) + 'px';
        element.style.left = (element.offsetLeft - pos1) + 'px';
    }

    const closeDragElement = () => {
        // stop moving when mouse button is released:
        document.removeEventListener('mouseup', closeDragElement);
        document.removeEventListener('mousemove', elementDrag);
    }
}
