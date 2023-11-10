const state= {
    score:{
        playerScore:0,
        computerScore:0,
        scoreBox:document.getElementById("score_points")
    },
    cardsSprites:{
        avatar:document.getElementById("card-image"),
        avatar:document.getElementById("card-name"),
        avatar:document.getElementById("card-type"),
    },
    fieldCards:{
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("player-field-card"),
    },
    playerSides:{
        player1: "player-cards",
        player1BOX:document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBOX:document.querySelector("computer-cards")
    },
    actions:{
        button:document.getElementById("next-duel"), 
    }, 
};

const playerSides = {
    player1: "player-field-card", 
    computer:"computer-field-card"
}

const playersSides = {
    player1:"player-cards",
    computer: "computer-cards"
};
 
const pathImages = "./src/assets/icons/"

const cardData = [ 
{
    id:0, 
    name: "Blues Eyes White Dragon",
    type: "Paper",
    img:`${pathImages} dragon.png`,
    WinOf: [1],
    LoseOf: [2],
},
{
    id:1, 
    name: "Dark magician",
    type: "Rock",
    img:`${pathImages} magician.png`,
    WinOf: [2],
    LoseOf: [0],
    },
{
    id:2,
    name: "Exodia",
    type:"Paper",
    type:Scissors,
    img:`${pathImages} exodia.png`,
    WinOf: [0],
    LoseOf: [1],
},    
];

async function getRandomCardId(){
    const randomIndex = Math.floor(random() * cardData.length)
    return cardData[randomIndex].id
}

async function createCardImage(IdCard, fieldSide){
    const cardImage = document.createElement("img")
    cardImage.setAttribute("height", "100px")
    cardImage.setAttribute("src", "./src/assets/icons/cards/back.png")
    cardImage.setAttribute("data-id", IdCard)
    cardImage.classList.add("card")

    if(fieldSide == playerSides.player1){
        cardImage.addEventListener("click", ()=>{
            setCardsField(cardImage.getAttribute("data-id"))
        })
    }

    cardImage.addEventListener("mouseover", ()=>{
        drawSelectCard(IdCard)
    })

    return cardImage
}

async function setCardsField(cardId){
    await removeAllCardsImages()

    let computerCardId = await getRandomCardId()

    await showHiddenCardFieldsImages(true)

    await hiddenCardDetails()

    await drawCardsInField(cardId,computerCardId)

    state.fieldCards.player.src = cardData[cardId].img
    state.fieldCards.computer.src = cardData[computerCardId].img

    let duelResults = await checkDuelResults(cardId, computerCardId)

    await updateScore() 
    await drawButton(duelResults)
}

async function drawCardsInField(cardId, computerCardId){
    state.fieldCards.player.src = cardData[cardId].img
    state.fieldCards.computer.src = cardData[computerCardId].img
}


async function showHiddenCardFieldsImages(value){
    if (value == true) {
        state.fieldCards.player.style.display = "block"
        state.fieldCards.computer.style.display = "block"
    }
    if (value == false) {
        state.fieldCards.player.style.display = "none"
        state.fieldCards.computer.style.display = "none"
    }
}


async function hiddenCardDetails(){

}
async function drawButton(text){
    state.actions.button.innerText = text.toUpperCase()
    state.actions.button.style.display = "block"
}

async function updateScore(){
    state.score.scoreBox.innerText`Win ${state.score.playerScore} | Lose: ${state.score.computerScoreScore}`
}

async function checkDuelResults(){
    let duelResults = "Draw"
    let playerCard = cardData[playerCardId]

    if (playerCard.WinOf.includes(computerCardId)){
        duelResults = "Win"
        state.score.playerScore++
    }

    if(playerCard.LoseOf.includes(computerCardId)){
        duelResults = "Lose"
        state.score.computerScore++
    }

    await playAudio(duelResults)

    return duelResults
}

async function removeAllCardsImages(){
    let card = state.playerSides.computerBOX
    let imgElements = cards.querySelectorAll("img")
    imgElements.forEach((img)=> img.remove())

    cards = state.playerSides.player1BOX
    imgElements = cards.querySelectorAll("img")
    imgElements.forEach((img)=> img.remove())
}

async function drawSelectCard(index){
        state.cardsSprites.avatar.src = cardData[index].img
        state.cardsSprites.name.innerText = cardData[index].name
        state.cardsSprites.type.innerText = "Attribute : " + cardData[index].type
    }

async function drawCards(cardNumbers, fieldSide){
    for (let i = 0; i <cardNumbers; i++) {
        const randomIdCard = await getRandomCardId()
        const cardImage = await createCardImage(randomIdCard, fieldSide)

        document.getElementById(fieldSide).appendChild(cardImage)
    } 
}

async function resetDuel(){
    state.cardsSprites.avatar.src = ""
    state.actions.button.style.display = "none"

    state.fieldCards.player.style.display = "none"
    state.fieldCards.computer.style.display = "none"

    init()
}

async function playAudio(status){
    const audio = new Audio(`./src/assets/audios/${status}.wav`)
    audio.play()

    try{
        audio.play()
    }catch{}
}

function init(){
    showHiddenCardFieldsImages(false)

    drawCards(5, "playerSides.player1")
    drawCards(5, "playerSides.computer")

    const bgm = document.getElementById("bgm")
    bgm.play()
}

init();