

let x = 512;
// container width and height

let y = 16;
// number of squares per side
//THIS WILL BE MODIFIED WITH THE SLIDER

let squareSize = x / y;
// size of each square

for (let i = 0; i < 256; i++) {
    let square = document.createElement('div');

    square.style.width = squareSize + 'px';
    square.style.height = squareSize + 'px';
    square.style.boxSizing = 'border-box';
    square.style.border = '1px solid lightgray';
   
    document.querySelector('.grid-container').appendChild(square);

    
}

