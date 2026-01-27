

let x = 450;
// container width and height

let y = 16;
// number of squares per side
//THIS WILL BE MODIFIED WITH THE SLIDER

let squareSize = Math.floor( x / y);
// size of each square

let squares = [];

let gridOn = true;

let colorMode = true; // true for color mode, false for darken mode




const colorButton = document.getElementById('color-mode');
const colorPicker = document.getElementById('color-picker');
const darkenButton = document.getElementById('darken');

let currentColor = colorPicker.value;

function activateColorMode() {
    currentColor = colorPicker.value;
    colorMode = true;
    colorButton.classList.add('selected');
    darkenButton.classList.remove('selected');
}


colorPicker.addEventListener('input', () => {
    activateColorMode();
});

colorButton.addEventListener('click', () => {
    activateColorMode();
});

darkenButton.addEventListener('click', () => {
    colorMode = false;
    darkenButton.classList.add('selected');
    colorButton.classList.remove('selected');
    currentColor = "rgb(200, 200, 200)";
});

// highlighted button logic



function gridStatus() {
    squares.forEach(square => {




    if (square.style.backgroundColor === 'rgb(255, 255, 255)') {
        if ((gridOn)) {
            square.style.border = '1px solid lightgray';
        } else {
            square.style.border = 'none';
    }
    }
    });
}

// grid logic, only turns on borders for uncolored squares





const fragment = document.createDocumentFragment();


function createGrid(size) {


    const container = document.querySelector('.grid-container');
    container.innerHTML = '';

    squares = [];

    // clears existing grid

    for (let i = 0; i < size * size; i++) {

 

    let square = document.createElement('div');

    square.style.width = squareSize + 'px';
    square.style.height = squareSize + 'px';
    square.style.boxSizing = 'border-box';
    square.style.backgroundColor = 'rgb(255, 255, 255)';

    square.darkness = 0;
   
        // square creation and styling

    fragment.appendChild(square);

    square.addEventListener('mouseenter', () => {
        if (!isDrawing) return;
            square.style.backgroundColor = currentColor;
            square.style.border = `1px solid ${currentColor}`;
            
            darkenColor(square);
        
        // coloring logic
    });

    square.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });
    // prevents dragging

    squares.push(square);
    // push square to squares array
    
   
}
    container.appendChild(fragment);
    gridStatus();
    
}


createGrid(y);


let isDrawing = false;

document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
        isDrawing = true;
    }
});

document.addEventListener('mouseup', () => {
        isDrawing = false;
});

// only allows drawing when mouse is held down

const reset = document.getElementById('reset-button');

reset.addEventListener('click', () => {
    createGrid(y);

    
});
// resets the grid

const grid = document.getElementById('grid-button');


grid.addEventListener('click', () => {
    gridOn = !gridOn;

    gridStatus();

});
// toggles grid lines on and off


function darkenColor(square) {
    if (square.darkness === undefined) {
        square.darkness = 0;
    }
    
    if (!colorMode && (square.darkness <= 200)){

        square.style.backgroundColor = `rgb(${200 - square.darkness}, ${200 - square.darkness}, ${200 - square.darkness})`;
        square.style.border = `1px solid rgb(${200 - square.darkness}, ${200 - square.darkness}, ${200 - square.darkness})`;
        if (square.darkness < 200){
            square.darkness += 40;
        }
    }
   
}
// darkens squares by 20% each time they are hovered over, stops when black

const slider = document.getElementById('grid-size');

const sliderDisplay = document.getElementById('grid-size-display');
sliderDisplay.textContent = `${y} x ${y}`;

slider.addEventListener('input', () => {
    y = slider.value;
    sliderDisplay.textContent = `${y} x ${y}`;
    squareSize = x / y;
    createGrid(y);
});    

// slider appearence and logic



// in firefox, the cubes are leaving a half square gap on each side, and spilling out the container at the bottom
// at 11x11, 16x16, 13x13, 14x14, 21x21, 23x23, 31x31