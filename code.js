


function initializeColor(gridElements){
    gridElements.forEach((element)=>{
        element.addEventListener('mouseover', ()=>{
            element.style.backgroundColor = 'black'; //Initial drawing color
        })
    })
}

function restartGrid(){
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

function updateGridSize(size){
    restartGrid();
    createGrid(size);
}

function handleSize(){
    const slider = document.querySelector('.grid-size input');
    const sizeElement = document.querySelector('.size');
    sizeElement.textContent = slider.value;
    slider.oninput = () => {
        sizeElement.textContent = slider.value
        updateGridSize(slider.value);
    };
    return slider.value;    
}

function updateColor(color){
    const gridElements = document.querySelectorAll('.grid-element');
    gridElements.forEach((element)=>{
        element.addEventListener('mouseover', ()=>{
            element.style.backgroundColor = color;
        })
    })
}

function handleColor(){
    const colorPicker = document.querySelector('.color input');
    const colorChangeButton = document.querySelector('.color-changer');
    colorChangeButton.addEventListener('click',()=>{
        updateColor(colorPicker.value);
    })
    return colorPicker.value;
    
}

function handleGrid(){
    const sizeOfGrid = handleSize();
    const colorChosen = handleColor();
    createGrid(sizeOfGrid, colorChosen);
}

handleGrid();
