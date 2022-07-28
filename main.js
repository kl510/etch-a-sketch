const gridContainer = document.querySelector('.grid-container');
const gridResetBtn = document.querySelector('.grid-btn');
const input = document.querySelector('input');
const gridSizeTxt = document.querySelector('.nav p');
const colorPicker = doucment.getElementById('color-picker');
const colorModeBtns = document.querySelectorAll('.color-modes button')
const sketchModeBtns = document.querySelectorAll('.sketch-modes button');
const eraseModeBtns = document.querySelectorAll('.erase-modes button')

let defaultGrid = 16;
appendToGrid(defaultGrid);

gridSizeTxt.textContent = `${defaultGrid} x ${defaultGrid}`;

sketchModes.forEach(button => {
    console.log(button);
});

function createRowDivs() {
    let div = document.createElement('div')
    div.classList.add('grid-row-divs');
    return div;
}

function createDivs() {
    let div = document.createElement('div')
    div.classList.add('grid-divs');
    return div;
}

function deleteRowDivs() {
    let divs = document.querySelectorAll('.grid-row-divs')
    divs.forEach(div => {
        gridContainer.removeChild(div);
    });

}

function appendToGrid(num) {
    for (let i = 0; i < num; i++) {
        let rowDivs = createRowDivs();
        gridContainer.appendChild(rowDivs);
        for(let j = 0; j < num; j++) {
            let divs = createDivs();
            rowDivs.appendChild(divs);
        }
    }

}

function getNewGrid(e) {
    return appendToGrid(e);
}


gridResetBtn.addEventListener('click', () => {
    if (input.value >= 1 && input.value <= 100) {
        deleteRowDivs();
        getNewGrid(input.value);
        gridSizeTxt.textContent = `${input.value} x ${input.value}`
        input.value = null;
    } else {
        alert('Please enter a number from 1 to 100.');
    }
});
