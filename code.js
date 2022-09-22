var mouseDownFlag = false;
var touchFlag = false;

function mouseUpDownListeners(){
    document.addEventListener('pointerdown', ()=>{
        mouseDownFlag = true;
    })
    document.addEventListener('touchstart', ()=>{
        touchFlag = true;
    })
    document.addEventListener('pointerup', ()=>{
        mouseDownFlag = false;
    })
    document.addEventListener('touchend', ()=>{
        touchFlag = false;
    })

}


/**
 * Initializes the drawing color.
 * @param {Array} gridElements 
 */
function initializeColor(gridElements){
    gridElements.forEach((element)=>{
        element.addEventListener('pointermove', ()=>{
            if(mouseDownFlag === true){
                element.style.backgroundColor = 'black'; //Initial drawing color
            }
        })
        element.addEventListener('touchmove', ()=>{
            if(touchFlag === true){
                element.style.backgroundColor = 'black'; //Initial drawing color
            }
        })
    })
}

/**
 * Clears the grid elements.
 */
function clearGrid(){
    const gridContainer = document.querySelector('.grid-container');
    while(gridContainer.hasChildNodes()){
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

/**
 * Create grid elements according to grid size to fill up
 * the grid.
 * @returns the grid elements array.
 */
 function createGridElements(size){
    const gridElements = [];
    for(let i = 0; i < size*size; i++){
        const squareElement = document.createElement('div');
        squareElement.style.width = `${500/size}`;
        squareElement.style.height = `${500/size}`;
        squareElement.classList.add('grid-element');
        gridElements.push(squareElement);
    }
    return gridElements;
}

/**
 * Insert grid elements as children of grid container.
 * @param {Array} gridElements 
 */
function insertGridElements(gridElements){
    gridContainer = document.querySelector('.grid-container');
    gridElements.forEach((element) =>{
        gridContainer.appendChild(element);
    })
}

/**
 * Partitions the grid evenly according to the size input.
 * @param {Number} size 
 */
function partitionGridEvenly(size){
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.style.gridTemplateColumns = `repeat(${size},1fr)`;
}

/**
 * Create a square grid of the given size.
 */
function createGrid(size){
    const gridElements = createGridElements(size);
    initializeColor(gridElements);
    partitionGridEvenly(size);
    insertGridElements(gridElements);
}

function updateGridSize(size, currentColor){
    clearGrid();
    createGrid(size);
    updateColor(currentColor);
}

/**
 * This function handles size of the grid.

 */
function handleSize(){
    const slider = document.querySelector('.grid-size input');
    const sizeElement = document.querySelector('.size');
    const colorPicker = document.querySelector('.color input');
    sizeElement.textContent = slider.value;
    slider.oninput = () => {
        sizeElement.textContent = slider.value
        updateGridSize(slider.value, colorPicker.value);
    };    
}

/**
 * This function updates the drawing color according to input.
 * @param {String} color 
 */
function updateColor(color){
    const gridElements = document.querySelectorAll('.grid-element');
    gridElements.forEach((element)=>{
        element.addEventListener('pointermove', ()=>{
            if(mouseDownFlag === true)
                element.style.backgroundColor = color;
        })
        element.addEventListener('touchmove', ()=>{
            if(touchFlag === true)
                element.style.backgroundColor = color;
        })
    })
}

/**
 * This function handles the color of drawing.
 */
function handleColor(){
    const colorPicker = document.querySelector('.color input');
    colorPicker.addEventListener('change', ()=>{
        updateColor(colorPicker.value);
    })
}

/**
 * This function handles restart button.
 * Saves the current size and color.
 */
function handleRestartButton(){
    const restartButton = document.querySelector('.restart-button');
    const sizePicker = document.querySelector('.grid-size input');
    const colorPicker = document.querySelector('.color input');
    restartButton.addEventListener('click',()=>{
        clearGrid();
        createGrid(sizePicker.value);
        updateColor(colorPicker.value);
    })
}




/**
 * This function handles the grid updates of size and color.
 */
function handleGrid(){
    handleSize();
    handleColor();
    handleRestartButton();
}

mouseUpDownListeners();
createGrid(16, 'black');
handleGrid();
