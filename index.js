const SIZE = 400;
let numSquare = 10;
let widthSquare = parseInt(SIZE / numSquare);

function getNumSquare() {
    return numSquare;
}

function setNumSquare(num) {
    numSquare = num;
}
function getWidthSquare() {
    return parseInt(SIZE / numSquare);
}

function setWidthSquare(num) {
    widthSquare = parseInt(SIZE / num);
}

const buttonResize = document.createElement("button");
const gridContainer = document.querySelector(".grid-container");

let sizeInput = document.createElement("input");
sizeInput.type = 'text';
sizeInput.placeholder = "Set size: 2 - 100";
sizeInput.className = "size-input";

let controlArea = document.createElement("div");
controlArea.append(buttonResize, sizeInput);

buttonResize.classList.add("btn-resize");
buttonResize.textContent = "Resize";

const container = document.querySelector(".container");
const rowSquare = createRowSquare(numSquare, widthSquare);
const canvas = drawCanvas(numSquare, rowSquare);

container.appendChild(canvas);

css(buttonResize, {
    'padding': '10px 20px',
    'font-size': '15px'
});
css(sizeInput, {
    'padding': '10px 20px',
    'font-size': '15px'

});
css(controlArea, {
    'margin-bottom': '20px'
});

buttonResize.addEventListener("click", resizeSquares);

function resizeSquares() {
    const userSizeInput = parseInt(sizeInput.value);

    if (userSizeInput == numSquare) {
        return;
    }

    setNumSquare(userSizeInput);
    setWidthSquare(userSizeInput);

    const rowSquare = createRowSquare(numSquare, widthSquare);
    const canvas = drawCanvas(numSquare, rowSquare);

    container.appendChild(canvas);
}



// grid-container.style.display = "flex";
// grid-container.style.flexDirection = "column";
// grid-container.style.justifyContent = "center";
// grid-container.style.alignItems = "center";
// grid-container.style.height = "100vh";



function css(element, style) {
    for (const property in style)
        element.style[property] = style[property];
}

function changeBgColor(e) {
    e.target.style.backgroundColor = "#ff6a00";
}


function createRowSquare(numSquare, widthSquare) {
    const rowSquare = document.createElement("div");
    rowSquare.classList.add(`row-${numSquare}-squares`);
    rowSquare.style.display = "flex";
    rowSquare.style.justifyContent = "center";

    for (let i = 1; i <= numSquare; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-item');

        css(square, {
            'border': '#acacacfc solid thin',
            'width': `${widthSquare}px`,
            'height': `${widthSquare}px`
        });
        
        square.addEventListener("mouseenter", changeBgColor);
        rowSquare.appendChild(square);
    }
    return rowSquare;
}

function drawCanvas(numSquare, rowSquare) {
    const gridContainer = document.querySelector(".grid-container");

    if (gridContainer.innerHTML != "") {
        gridContainer.innerHTML = "";
    }

    css(gridContainer, {
        'display': 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'center'
        // 'width': `${SIZE}px`,
        // 'height': `${SIZE}px`
    });

    gridContainer.addEventListener("mouseenter", (event) => {
        if (event.target && event.target.matches('.grid-item')) {
            event.target.style.backgroundColor = "#fcba03";
        }
    }, true);

    for (let i = 1; i <= numSquare; i++) {
        const clone = rowSquare.cloneNode(true);
        gridContainer.appendChild(clone);
    }

    return gridContainer;
}

container.append(controlArea);