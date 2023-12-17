const emojiList = ["🐳", "💀", "👽", "🍕", "🚲"]
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




let isAbleToFlip = true

function init() {
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
            if (flippedCards.some(card => card.id === e.target.id)) return

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


