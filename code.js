
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
        squareElement.addEventListener('mouseover',()=>{
            squareElement.classList.add('grid-element-hover');
        })
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
 * Create a square grid of the given size.
 */
function createGrid(size){
    const gridElements = createGridElements(size);
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.style.gridTemplateColumns = `repeat(${size},1fr)`;
    insertGridElements(gridElements);
    
}

function getSizeInput(){
    const slider = document.querySelector('.grid-size input');
    const sizeElement = document.querySelector('.size');
    sizeElement.textContent = slider.value;
    slider.oninput = () => {
        sizeElement.textContent = slider.value
        handleGrid();
    };
    return slider.value;
    
}

function restartGrid(){
    const gridContainer = document.querySelector('.grid-container');
    while(gridContainer.hasChildNodes()){
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

function handleGrid(){
    restartGrid();
    const sizeOfGrid = getSizeInput();
    createGrid(sizeOfGrid);
}
handleGrid();
