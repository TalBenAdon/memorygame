const cardsImageValues = ["images/1 LUDEN's TEMPEST.png",
    "images/2 LIANDRY's ANGUISH.png",
    "images/3 Night Harverst.png",
    "images/4 Galeforce.png",
    "images/5 KRAKEN SLAYER.png",
    "images/6 NAVORI QUICK BLADE.png",
    "images/7  SERPENT FANG.png",
    "images/8 IMMORTAL SHIELDBOW.png",
    "images/9 Demonic Embrace.png",
    "images/10 Trinity Force.png",
    "images/11 Rapid Firecannon.png",
    "images/12 Sterak's Gage.png",
    "images/13 Yommu's Ghostblade.png",
    "images/14 Lich Bane.png",
    "images/15 Blade of the Ruined King.png"]
let selectedCards

const backOfCards = ["images/Spirit_Blossom_LoR_Card_Back.webp"]

const difficultyList = ["Easy", "Medium", "Hard"]

const MATCHES = 2
let shuffledList
function shuffle(listToShuffle) {
    let currentIndex = listToShuffle.length, randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [listToShuffle[currentIndex], listToShuffle[randomIndex]] =
            [listToShuffle[randomIndex], listToShuffle[currentIndex]]
    }
    shuffledList = listToShuffle
    return shuffledList;
}


function handleDifficultySelector(difficulty) {

    switch (difficulty) {
        case "Easy":
            selectedCards = cardsImageValues.slice(0, 5)
            break;
        case "Medium":
            selectedCards = cardsImageValues.slice(0, 10)
            break;
        case "Hard":
            selectedCards = cardsImageValues.slice(0, 15)
            break;

        default:
            selectedCards = cardsImageValues.slice(0, 5)
            break;
    }
    resetBoard()
}

function flipBackCards(flippedCards) {

    flippedCards.forEach(card => {
        card.src = backOfCards[0]

    })

}

function showDropDown() {
    document.getElementById("myDropdown").classList.toggle("show")
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content")
        let i

        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i]
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show')
            }

        }
    }
}
function flipBackCard(card) {
    card.classList.remove('flipped');
    card.classList.add('flipping-back');
    setTimeout(() => {
        card.classList.remove('flipping-back');
    }, 500);
}

function resetBoard() {
    const boardElement = document.getElementById("cards-div-container");
    boardElement.innerHTML = ""; // Clear the existing board

    let flippedCards = [];
    let correctCards = [];
    const doubledEmojiList = selectedCards.concat(selectedCards);
    shuffle(doubledEmojiList);

    shuffledList.forEach((cardValue, i) => {
        const cardElement = document.createElement("img");
        cardElement.className = 'card';

        cardElement.id = i;
        cardElement.value = cardValue;
        cardElement.src = backOfCards[0]
        cardElement.onclick = (e) => {
            if (flippedCards.some(card => card.id === e.target.id)) return
            if (correctCards.some(card => card.id === e.target.id)) return
            cardElement.classList.add('flipped')
            if (!isAbleToFlip) return
            e.target.src = cardValue
            flippedCards.push(cardElement)
            console.log(flippedCards);
            if (flippedCards.length === MATCHES) {
                const areFlippedCardsSame = flippedCards.every(card => card.src === e.target.src)

                if (!areFlippedCardsSame) {
                    isAbleToFlip = false
                    setTimeout(() => {
                        flipBackCards(flippedCards)
                        flipBackCard(flippedCards[0])
                        flipBackCard(flippedCards[1])
                        flippedCards = []
                        isAbleToFlip = true
                    }, 500)

                } else {
                    correctCards.push(...flippedCards)
                    flippedCards = []
                    console.log(correctCards);
                }

            }
            if (correctCards.length === shuffledList.length) {
                setTimeout(() => {
                    const finishGameElement = document.createElement("div")
                    boardElement.appendChild(finishGameElement)
                    const finishGameTextElement = document.createElement("h1")
                    const finishGameButtonRestartElement = document.createElement("button")
                    finishGameButtonRestartElement.onclick = (e) => { location.reload() }
                    finishGameTextElement.innerHTML = "You've won the game, congratulations"
                    finishGameElement.appendChild(finishGameTextElement)
                    finishGameElement.appendChild(finishGameButtonRestartElement)


                }, 100)
            }



            // const areAllCardsSame = flippedCards.every(card => card === e.target.innerText)
            // if (!areAllCardsSame) {

            // }
            // console.log(areAllCardsSame);
            // if (flippedCards.length == 2) {

            // }

        };

        boardElement.appendChild(cardElement);
    });
}
let isAbleToFlip = true

function init() {

    const headerElement = document.getElementById("header")

    const buttonContainerElement = document.createElement("div")
    buttonContainerElement.className = "dropdown"
    headerElement.appendChild(buttonContainerElement)

    const mainDropDownButtonElement = document.createElement("button")
    mainDropDownButtonElement.onclick = (e) => { showDropDown() }
    mainDropDownButtonElement.className = "dropbtn"
    mainDropDownButtonElement.innerHTML = "Easy"
    buttonContainerElement.appendChild(mainDropDownButtonElement)

    const dropDownContentContainer = document.createElement("div")
    dropDownContentContainer.className = "dropdown-content"
    dropDownContentContainer.id = "myDropdown"
    buttonContainerElement.appendChild(dropDownContentContainer)

    for (let i = 0; i < difficultyList.length; i++) {
        const buttonElement = document.createElement("button")

        buttonElement.id = difficultyList[i]
        buttonElement.innerHTML = difficultyList[i]
        buttonElement.onclick = (e) => {
            handleDifficultySelector(e.target.id);
            mainDropDownButtonElement.innerHTML = (e.target.innerHTML)

        }
        dropDownContentContainer.appendChild(buttonElement)

    }



    handleDifficultySelector("Easy")

}


init()


