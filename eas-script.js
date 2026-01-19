

let x = 512;
// container width and height

let y = 16;
// number of squares per side
//THIS WILL BE MODIFIED WITH THE SLIDER

let squareSize = x / y;
// size of each square

let squares = [];

let gridOn = true;

let colorMode = true; // true for color mode, false for darken mode





const colorPicker = document.getElementById('color-picker');
const darkenButton = document.getElementById('darken');

let currentColor = colorPicker.value;

colorPicker.addEventListener('input', () => {
    currentColor = colorPicker.value;
    colorMode = true;
    colorPicker.classList.add('selected');
    darkenButton.classList.remove('selected');
});

darkenButton.addEventListener('click', () => {
    colorMode = false;
    darkenButton.classList.add('selected');
    colorPicker.classList.remove('selected');
    currentColor = "rgb(200, 200, 200)";
});





function gridStatus() {
    squares.forEach(square => {
        if (gridOn) {
            square.style.border = '1px solid lightgray';
        } else {
            square.style.border = 'none';
        }

    });
}







const fragment = document.createDocumentFragment();


function createGrid(size) {


    const container = document.querySelector('.grid-container');
    container.innerHTML = '';

    squares = [];

    for (let i = 0; i < size * size; i++) {

 

    let square = document.createElement('div');

    square.style.width = squareSize + 'px';
    square.style.height = squareSize + 'px';
    square.style.boxSizing = 'border-box';

    square.darkness = 0;
   
   

    fragment.appendChild(square);

    square.addEventListener('mouseenter', () => {
        if (!isDrawing) return;
            square.style.backgroundColor = currentColor;
            
            darkenColor(square);
            
    });

    square.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });
    squares.push(square);

   
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

const reset = document.getElementById('reset-button');

reset.addEventListener('click', () => {
    console.log('reset clicked');
    createGrid(y);

    
});

const grid = document.getElementById('grid-button');






grid.addEventListener('click', () => {
    
    console.log('grid clicked');
    
    gridOn = !gridOn;

    gridStatus();
    
    

});


function darkenColor(square) {
    if (square.darkness === undefined) {
        square.darkness = 0;
    }
    
   

    if (!colorMode && (square.darkness <= 200)){
        
        
        console.log(square.darkness);
        square.style.backgroundColor = `rgb(${200 - square.darkness}, ${200 - square.darkness}, ${200 - square.darkness})`;
        if (square.darkness < 200){
            square.darkness += 40;
        }
    }
        
    
   
}


const slider = document.getElementById('grid-size');

const sliderDisplay = document.getElementById('grid-size-display');

slider.addEventListener('input', () => {
    y = slider.value;
    sliderDisplay.textContent = `${y} x ${y}`;
    squareSize = x / y;
    createGrid(y);
});    


