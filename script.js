const container = document.querySelector('#main-container');
const resetBtn = document.querySelector('#reset-btn');
const removeBtn = document.querySelector('#remove-btn');
const msgElem = document.querySelector('.message');

resetBtn.addEventListener('click', () => {
    reset();
});
removeBtn.addEventListener('click', () => {
    reset(true);
});

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
    } else if (gridSize > 1000) {
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
}

function setGrid(gridSize) {
    cardsAmountInGrid = Math.pow(gridSize, 2);
    for (let i = 0; i < cardsAmountInGrid; i++) {
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        container.appendChild(newCard);

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            newCard.addEventListener('click', hoverCard); // mobile, need another event
        } else {
            newCard.addEventListener('mouseover', hoverCard); // pc
        }
    }

    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
}

function clearContainer(remove = false) {
    const cardList = document.querySelectorAll('.card');
    cardList.forEach(card => {
        if (remove) {
            container.removeChild(card);
        } else {
            card.style.backgroundColor = '#ddd';
            card.classList.remove('card-hover');
        }
    });
}

function hoverCard(e) {
    const currentCard = e.target;
    if (currentCard.classList.contains('card-hover')) {
        increaseOpacityProperty(currentCard, 0.1);
    } else {
        currentCard.classList.add('card-hover');
        const newColor = getRandomColor();
        currentCard.style.backgroundColor = newColor;
    }
}

function increaseOpacityProperty(elem, valueToIncrease) {
    let currentOpacity = +elem.style.opacity;
    currentOpacity += valueToIncrease;
    elem.style.opacity = currentOpacity;
}

function getRandomColor() {
    const redValue = getRandomNumberFrom0To255();
    const greenValue = getRandomNumberFrom0To255();
    const blueValue = getRandomNumberFrom0To255();
    const newColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;

    return newColor;
}

function getRandomNumberFrom0To255() {
    return Math.floor(Math.random() * (255 - 0 + 1)) + 0;
}

function reset(remove = false) {
    clearContainer(remove);
    showHtmlMessage('There is no grid now.');
    if (!remove) {
        main();
    }
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

    setGrid(gridSize);
    showHtmlMessage(`Grid size: ${gridSize}x${gridSize}.`);
}

main();