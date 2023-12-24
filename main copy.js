const ExtendedEmojiList = ["🐳", "💀", "👽", "🍕", "🚲", "🎁", "🐲", "🤖", "🐱‍👤", "🦍", "🥶", "🎶", "🎨", "⚽", "🎃"]
const emojiList = ["🐳", "💀", "👽", "🍕", "🚲"]
const difficultyList = ["Easy", "Medium", "Hard"]
const doubledEmojiList = emojiList.concat(emojiList)
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


function cardsCreation() {

}

function flipBackCards(flippedCards) {

    flippedCards.forEach(card => {
        card.innerText = ""
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


let isAbleToFlip = true

function init() {

    const headerElement = document.getElementById("header")

    const buttonContainerElement = document.createElement("div")
    buttonContainerElement.className = "dropdown"
    headerElement.appendChild(buttonContainerElement)

    const mainDropDownButtonElement = document.createElement("button")
    mainDropDownButtonElement.onclick = (e) => { showDropDown() }
    mainDropDownButtonElement.className = "dropbtn"
    mainDropDownButtonElement.innerHTML = "Difficulty"
    buttonContainerElement.appendChild(mainDropDownButtonElement)

    const dropDownContentContainer = document.createElement("div")
    dropDownContentContainer.className = "dropdown-content"
    dropDownContentContainer.id = "myDropdown"
    buttonContainerElement.appendChild(dropDownContentContainer)

    for (let i = 0; i < difficultyList.length; i++) {
        const buttonElement = document.createElement("button")
        buttonElement.id = difficultyList[i]
        buttonElement.innerHTML = difficultyList[i]
        dropDownContentContainer.appendChild(buttonElement)

    }





    const boardElement = document.getElementById("cards-div-container")
    let flippedCards = []
    let correctCards = []
    shuffle(doubledEmojiList)
    shuffledList.forEach((cardValue, i) => {
        const cardElement = document.createElement("div")
        cardElement.className = 'card'
        cardElement.id = i
        cardElement.value = cardValue
        cardElement.onclick = (e) => {
            if (correctCards.some(card => card.id === e.target.id)) return

            if (!isAbleToFlip) return
            e.target.innerText = e.target.value
            flippedCards.push(cardElement)
            console.log(flippedCards);
            if (flippedCards.length === MATCHES) {
                const areFlippedCardsSame = flippedCards.every(card => card.innerText === e.target.innerText)

                if (!areFlippedCardsSame) {
                    isAbleToFlip = false
                    setTimeout(() => {
                        flipBackCards(flippedCards)
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
        }
        boardElement.appendChild(cardElement)
    });
}


init()


