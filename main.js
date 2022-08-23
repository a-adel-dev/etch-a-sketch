const board = document.querySelector("#board");
let gridValue = parseInt(document.querySelector("#grid-value").textContent);
let colorBox = document.querySelector("#color");
let color = document.querySelector("#color").value;
let paintStyle = document.createElement('style');
let boardGridStyle = document.createElement('style');



const colorBtn = document.querySelector('#btn-color');
const rainbowBtn = document.querySelector('#btn-rainbow');
const clearBtn = document.querySelector('#btn-clear');
const eraserBtn = document.querySelector('#btn-eraser');
const slider = document.querySelector('.slider');

const gridValueSpan = document.querySelectorAll('#grid-value');


let pixels=[];


const GRID_SIZE = 600;


function CreatePixels(gridValue){
    pixels = [];
    const gridSize = GRID_SIZE / gridValue;
    for(let i = 0; i < gridValue * gridValue; i++) {
        const pixel = document.createElement('div');
        pixel.id = 'pixel';
        AddPaintStyle(color);
        pixels.push(pixel);
    }
}

function AddPaintStyle(color){
        pixels.forEach(pixel => {
            pixel.addEventListener('mouseover', ()=>{
            pixel.style.backgroundColor = color;
        });
    });
}

function UpdateGrid(){
    board.innerHTML ="";
    UpdatePaintStyle();
    UpdateBoardStyle();
    pixels.forEach(pixel => {
        board.appendChild(pixel);
    });
    
}

CreatePixels(gridValue);
UpdateGrid(gridValue);


function UpdateColor(){
    color = colorBox.value;
    AddPaintStyle(color);
}

function UpdatePaintStyle() {
    const gridSize = GRID_SIZE / gridValue;
    paintStyle.innerHTML = ` #pixel {border: 1px solid var(--color-primary-light);
        width = ${gridSize}px;
        height = ${gridSize}px;
    }`;
    document.head.appendChild(paintStyle);
}

function UpdateBoardStyle(){
    const gridSize = GRID_SIZE / gridValue;
    boardGridStyle.innerHTML = `#board {
        grid-template-columns: repeat(${gridValue}, ${gridSize}px);
        grid-template-rows: repeat(${gridValue}, ${gridSize}px);
    }
    `;
    document.head.appendChild(boardGridStyle);
}



// General Event Listeners
clearBtn.addEventListener('click', ClearBoard);
eraserBtn.addEventListener('click', Eraser);
colorBox.addEventListener('change', UpdateColor, false);
rainbowBtn.addEventListener('click', RainbowColorMode);
colorBtn.addEventListener('click', StandardColorMode);

slider.addEventListener('change', ChangeGrid);


function ChangeGrid(){
    gridValue = parseInt(slider.value);
    CreatePixels(parseInt(slider.value));
    UpdateGrid(parseInt(slider.value));
    console.log(pixels);
    gridValueSpan.forEach((x)=>{
        x.textContent = slider.value;
    });
}



function ClearBoard(){
    pixels.forEach(pixel =>{
        pixel.style.backgroundColor = "#fff";
    });
}

function Eraser(){
    eraserBtn.classList.toggle('active');
    if(eraserBtn.classList.contains('active')){
        AddPaintStyle('#fff');
    }
    else {
        AddPaintStyle(color);
    }
}


function RainbowColorMode(){
    colorBtn.classList.remove('active');
    rainbowBtn.classList.add('active');
    pixels.forEach(pixel => {
        const randomR = Math.floor(Math.random()*255);
        const randomG = Math.floor(Math.random()*255);
        const randomB = Math.floor(Math.random()*255);
        pixel.addEventListener('mouseover', ()=>{
        pixel.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    });
    });
}

function StandardColorMode(){
    rainbowBtn.classList.remove('active');
    colorBtn.classList.add('active');
    AddPaintStyle(color);
}