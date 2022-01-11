const DEFAULT_COLOR = '#000000';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

let setCurrentColor = (newColor) => {
    currentColor = newColor;
}

let setCurrentMode = (newMode) => {
    activationButton(newMode);
    currentMode = newMode;
}

let setCurrentSize = (newSize) => {
    currentSize = newSize;
}



const container = document.getElementById('container');
const colorPicker = document.getElementById('colorpicker');
const gridSize = document.getElementById('sizes');
const colorButton = document.querySelector('.color-mode');
const randomButton = document.querySelector('.random-mode');
const eraserButton = document.querySelector('.eraser');
const clearButton = document.querySelector('.clear');
const gridButton = document.querySelector('.adjustment');
const valueLabel = document.querySelector('.slider-value')

colorPicker.onchange = (e) => setCurrentColor(e.target.value);
colorButton.onclick = () => setCurrentMode('color');
randomButton.onclick = () => setCurrentMode('random');
eraserButton.onclick = () => setCurrentMode('eraser');
clearButton.onclick = () => reload();
gridSize.onchange = (e) => changeSize(e.target.value);

let changeSize = (value) => {
    setCurrentSize(value);
    updateSize(value);
    reload();
}

let updateSize = (value) => {
    valueLabel.innerHTML = `${value} x ${value}`;
}


let reload = () => {
    clearGrid();
    makeGrid(currentSize);
}

let clearGrid = () => {
   container.innerHTML = '';
   
   
}

let makeGrid = (size) => {
    container.style.setProperty('--grid-rows', `${size}`);
    container.style.setProperty('--grid-cols', `${size}`);
    for (c = 0; c < (size * size); c++) {
        let cell = document.createElement('div');
        cell.addEventListener('mouseover', changeColor);
        container.appendChild(cell).className = "grid-item";
    };
};


let changeColor = (e) => {
    if (currentMode === 'random') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe';
    }
}

let activationButton = (newMode) => {
    if (currentMode === 'random') {
        randomButton.classList.remove('active');
    } else if (currentMode === 'color') {
        colorButton.classList.remove('active');
    } else if (currentMode === 'eraser') {
        eraserButton.classList.remove('active')
    }

    if (newMode === 'random') {
        randomButton.classList.add('active');
    } else if (newMode === 'color') {
        colorButton.classList.add('active');
    } else if (newMode === 'eraser') {
        eraserButton.classList.add('active');
    }
}




window.onload = () => {
    makeGrid(DEFAULT_SIZE);
    activationButton(DEFAULT_MODE);
}


