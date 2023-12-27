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

let MATCHES = 2
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


const difficultySelector = document.getElementById('difficultySelector')
function handleDifficultySelector(difficulty) {
    const currentDifficulty = difficultySelector.value

    const boardElement = document.getElementById("cards-div-container");
    boardElement.classList.remove('easy-mode')
    boardElement.classList.remove('hard-mode')

    switch (currentDifficulty) {
        case "Easy":
            selectedCards = cardsImageValues.slice(0, 5)
            boardElement.classList.add('easy-mode')
            MATCHES = 2
            break;
        case "Medium":
            selectedCards = cardsImageValues.slice(0, 10)
            boardElement.classList.add('hard-mode')
            MATCHES = 2
            break;
        case "Hard":
            selectedCards = cardsImageValues.slice(0, 10)
            boardElement.classList.add('hard-mode')
            break;
        default:
            selectedCards = cardsImageValues.slice(0, 5)
            boardElement.classList.add('easy-mode')
            break;
    }
    resetBoard()
}

const matchingSelector = document.getElementById('matchNumberSelector')

function handleMatchingSelector() {
    const currentMatchingNumber = matchingSelector.value
    return MATCHES = Number(currentMatchingNumber)
}


function flipBackCards(flippedCards) {

    flippedCards.forEach(card => {
        card.src = backOfCards[0]

    })

}



function flipBackCard(card) {
    card.classList.remove('flipped');
    card.classList.add('flipping-back');
    setTimeout(() => {
        card.classList.remove('flipping-back');
    }, 500);
}

function setNumberOfMatches(selectedCards) {
    const doubledEmojiList = []

    for (card of selectedCards) {
        for (let i = 0; i < MATCHES; i++) {
            doubledEmojiList.push(card)
        }
    }
}

function resetBoard() {
    const boardElement = document.getElementById("cards-div-container");
    boardElement.innerHTML = ""; // Clear the existing board


    let flippedCards = [];
    let correctCards = [];
    let doubledEmojiList = []
    if (difficultySelector.value === "Hard") {
        MATCHES = 3



        for (card of selectedCards) {
            for (let i = 0; i < MATCHES; i++) {
                doubledEmojiList.push(card)
            }
        }
    } else {

        doubledEmojiList = selectedCards.concat(selectedCards);
    }


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
                        for (let i = 0; i < flippedCards.length; i++) {
                            flipBackCard(flippedCards[i])
                        }
                        // flipBackCard(flippedCards[0])
                        // flipBackCard(flippedCards[1])
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

    handleDifficultySelector("Easy")

}


init()


