const gridContainer = document.querySelector('.grid-container');
const gridResetBtn = document.querySelector('.grid-btn');
const gridInput = document.getElementById('grid-input');
const gridSizeTxt = document.querySelector('.nav p');
const colorModeBtns = document.querySelectorAll('.color-modes h3 ~ *:not(:last-child)');
const sketchModeBtns = document.querySelectorAll('.sketch-modes button');
const eraseAll = document.getElementById('erase-all');
const gridLine = document.querySelector('.grid-lines');
const color = document.getElementById('color-picker');
let defaultGrid = 16;
let gridNum = 0;
let active = false;
let colorBtn;
let sketchBtn;
let gridDivs;
let colorId;
let rgbNum;


gridSizeTxt.textContent = `${defaultGrid} x ${defaultGrid}`;
createGrid(defaultGrid);

function createGrid(num) {
    for (let i = 0; i < num; i++) {
        let rowDivs = document.createElement('div');
        rowDivs.classList.add('grid-rows');
        gridContainer.appendChild(rowDivs);
        for(let j = 0; j < num; j++) {
            let divs = document.createElement('div');
            divs.classList.add('grid-divs', 'lines');
            rowDivs.appendChild(divs);
        }
    }
    let div = document.querySelectorAll('.grid-divs');
    gridDivs = div;
}

function deleteRowDivs() {
    let rowDivs = document.querySelectorAll('.grid-rows')
    rowDivs.forEach(div => {
        gridContainer.removeChild(div);
    });

}

gridLine.addEventListener('click', () => {
    gridDivs.forEach(div => {
        div.classList.toggle('lines')
    });
}) ;


gridResetBtn.addEventListener('click', () => {
    gridNum = gridInput.value
    if (gridNum >= 1 && gridNum <= 100) {
        deleteRowDivs();
        createGrid(gridInput.value);
        gridSizeTxt.textContent = `${gridInput.value} x ${gridInput.value}`
        gridInput.value = null;
    } else {
        alert('Please enter a number from 1 to 100.');
    }
});

colorModeBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        colorModeBtns.forEach(button => {
            button.classList.remove('active');
        });
        e.target.classList.add('active');
        colorBtn = e.target.textContent;
        colorId = e.target.id;
    });
});



sketchModeBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        sketchModeBtns.forEach(button => {
            button.classList.remove('active');
        });
        e.target.classList.add('active');
        sketchBtn = e.target.innerText;
    });
});

function draw(e) {
    if (colorBtn == 'Black') {
        rgbNum = 0;
        e.target.style.backgroundColor = `rgb(${rgbNum}, ${rgbNum}, ${rgbNum})`;
    } else if (colorBtn == 'Eraser') {
        e.target.style.backgroundColor = 'transparent';
    } else if (colorId == 'color-picker') {
        e.target.style.backgroundColor = color.value
    } else if (colorBtn == 'Rainbow') {
        rainbow(e);
    } else if (colorBtn == 'Lighten') {
        lighten(e);
    } else if (colorBtn == 'Shader') {
        shader(e);
    }

}

function rainbow(e) {
    let nums = [];
    for (let i = 0; i < 3; i++) {
        nums[i] = Math.floor(Math.random() * 256);
    }
    e.target.style.backgroundColor = `rgb(${nums[0]}, ${nums[1]}, ${nums[2]})`;
}

function returnRgbString(e) {
    let regex = (/\d+/g);
    let bgColor = e.target.style.backgroundColor;
    let rgbString = bgColor.match(regex);
    let rgbArr = rgbString.map(string => parseInt(string));
    return rgbArr;
}

function shader(e) {
    let currentRgb = returnRgbString(e);
    let [currentR, currentG, currentB] = currentRgb;
    e.target.style.backgroundColor = `rgb(${currentR = currentR * 0.65}
        , ${currentG = currentB * 0.65}
        , ${currentG = currentB * 0.65})`
}

function lighten(e) {
    let currentRgb = returnRgbString(e);
    let [currentR, currentG, currentB] = currentRgb;
    e.target.style.backgroundColor = `rgb(${currentR = currentR + (0.4 * (255 - currentR))}
                , ${currentB = currentB + (0.4 * (255 - currentB))}
                , ${currentG = currentG + (0.4 * (255 - currentG))})`
}

eraseAll.addEventListener('click', () => {
    confirm('Erase All?');
    deleteRowDivs();
    if (gridNum !== 0) {
        createGrid(gridNum);
    } else if (gridNum == 0) {
        createGrid(defaultGrid);
    }
})

function toggleHover() {
    if (sketchBtn == 'Hover') {
        if(!active) {
            gridDivs.forEach(div => {
                div.addEventListener('mouseover', draw);
            });
            active = true;
        } else {
            gridDivs.forEach(div => {
                div.removeEventListener('mouseover', draw);
            });
            active = false;
        }
    }
}

function toggleOnClickDrag() {
    if(!active) {
        if (sketchBtn == 'Click') {
            gridDivs.forEach(div => {
                div.addEventListener('click', draw);
            });
        } else if (sketchBtn == 'Drag') {
            gridDivs.forEach(div => {
                div.addEventListener('mousedown', dragOn)
            });
            gridDivs.forEach(div => {
                div.addEventListener('mouseup', dragOff)
            })
        }
        active = false
    }
}

function dragOn() {
    if(!active) {
        gridDivs.forEach(div => {
            div.addEventListener('mouseover', draw);
        });
        active = true;
    }
}

function dragOff() {
    if(active) {
        gridDivs.forEach(div => {
            div.removeEventListener('mouseover', draw);
        });
        active = false;
    }
}

function toggleAllOff() {
    gridDivs.forEach(div => {
        div.removeEventListener('mouseover', draw);
        div.removeEventListener('click', draw);
        div.removeEventListener('mousedown', dragOn);
        div.removeEventListener('mouseup', dragOff);
    })
    active = false;
}

gridContainer.addEventListener('click', toggleHover);
gridContainer.addEventListener('mouseenter', toggleOnClickDrag);
gridContainer.addEventListener('mouseleave', toggleAllOff)
