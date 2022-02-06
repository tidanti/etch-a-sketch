const container = document.querySelector('#main-container');
const resetBtn = document.querySelector('#reset-btn');
const msgElem = document.querySelector('.message');

resetBtn.addEventListener('click', reset);

function setContainerHeight() {
    const currentWidth = container.offsetWidth;
    container.style.height = `${currentWidth}px`;
}

function getGridSettings() {
    let gridSize;
    do {
        gridSize = +prompt('Enter the grid size:', 16);
    } while (!checkGridSettings(gridSize));

    return gridSize;
}

function checkGridSettings(gridSize) {
    if (!gridSize && gridSize !== 0) {
        showAlertMessage('Not a number. Repeat input.')
        return false;
    } else if (gridSize > 100) {
        showAlertMessage('Enter grid size <= 100.');
        return false;
    } else if (gridSize < 0) {
        showAlertMessage('Enter grid size > 0.');
        return false;
    } else {
        return true;
    }
}

function checkForCancel(gridSize) {
    return (gridSize === 0) ? true : false;
}

function cancelProcess() {
    clearContainer();
    showHtmlMessage('There is no grid now.');
}

function setGrid(gridSize) {
    cardsAmountInGrid = Math.pow(gridSize, 2);
    for (let i = 0; i < cardsAmountInGrid; i++) {
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        container.appendChild(newCard);
        newCard.addEventListener('mouseover', hoverCard);
    }

    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    //setCardsEventListeners();
}

function setCardsEventListeners() {
    const cardsList = document.querySelectorAll('.card');
    cardsList.forEach(card => {
        card.addEventListener('mouseover', hoverCard);
    });
}

function clearContainer(remove = false) {
    const cardList = document.querySelectorAll('.card');
    cardList.forEach(card => {
        if (remove) {
            container.removeChild(card);
        } else {
            card.classList.remove('card-hover');
        }
    });
}

function hoverCard(e) {
    const currentCard = e.target;
    currentCard.classList.toggle('card-hover');
}

function reset() {
    clearContainer();
    showHtmlMessage('There is no grid now.');
    main();
}

function showHtmlMessage(msg) {
    msgElem.textContent = msg;
}

function showAlertMessage(msg) {
    alert(msg);
}

function main() {
    //setContainerHeight(); default is better
    const gridSize = getGridSettings();
    if (checkForCancel(gridSize)) {
        cancelProcess();
        return;
    }
    // set grid
    setGrid(gridSize);
    showHtmlMessage(`Grid size: ${gridSize}x${gridSize}.`);
}

main();