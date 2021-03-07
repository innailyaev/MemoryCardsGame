const gameBoard=document.querySelector('#gameBoard');
const startBtn=document.querySelector('.start');
const right=document.querySelector('.right');
const wrong=document.querySelector('.wrong');
const win=document.querySelector('.win');
let row=3, col=4;
let cardsArr=['cupcake','macaron','chipCookie','applePie','strawberries','cake','cupcake','macaron','chipCookie','applePie','strawberries','cake'];
let count=0;
let cardOgj={
    firstCard:-1,
    secondCard:-1,
    wrong:0,
    right:0,
}
let typeCard1='';
let typeCard2='';

function createDivs(){
    for(let i=0;i<row;i++){
        for(let j=0;j<col;j++){
            gameBoard.innerHTML+=`<div id='${i},${j}' class='cube'></div>`
        }
    }
}

function createBoardGame(){
shuffle(cardsArr);
console.log(shuffle(cardsArr));
for(let i=0;i<row;i++){
    for(let j=0;j<col;j++){
       let card= document.getElementById(`${i},${j}`);
    //    card.classList.add(`${cardsArr[count]}`)
       console.log("card",card);
       card.setAttribute("type", `${cardsArr[count]}`);
       count++;
        }
    }

    document.querySelectorAll('.cube').forEach(item => {
        item.addEventListener('click', playGame )});
}
   
function playGame(e){
    if(cardOgj.firstCard==-1){
            cardOgj.firstCard=e.target;
            typeCard1=e.target.getAttribute('type');
            cardOgj.firstCard.classList.add(`${typeCard1}`);
            console.log("1",cardOgj.firstCard,typeCard1);
        }
    else if(cardOgj.secondCard==-1){
            cardOgj.secondCard=e.target;
            typeCard2=e.target.getAttribute('type');
            cardOgj.secondCard.classList.add(`${typeCard2}`);
            console.log("2",cardOgj.secondCard,typeCard2);
            if(cardOgj.firstCard.getAttribute('type')==cardOgj.secondCard.getAttribute('type')){
                cardOgj.right++;
                right.innerHTML=cardOgj.right;
                let type=cardOgj.firstCard.getAttribute('type');
                setTimeout(()=>{
                    cardOgj.firstCard.classList.add(`${type}`);
                    cardOgj.secondCard.classList.add(`${type}`);
                    cardOgj.firstCard=-1;
                    cardOgj.secondCard=-1;
                },1000)
            }
            else{
                cardOgj.wrong++;
                wrong.innerHTML=cardOgj.wrong;
                setTimeout(()=>{
                    cardOgj.firstCard.classList.remove(`${typeCard1}`);
                    cardOgj.secondCard.classList.remove(`${typeCard2}`);
                    cardOgj.firstCard=-1;
                    cardOgj.secondCard=-1;
                },1000)
                
            }
            
        } 
        if(right.innerHTML=='6'){
            win.style.display='block';
        }   
    }

  
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  //start button eventListener
  startBtn.addEventListener('click',()=>{
    gameBoard.innerHTML='';
    right.innerHTML='';
    wrong.innerHTML='';
    win.style.display='none';
    cardOgj.firstCard=-1;
    cardOgj.secondCard=-1;
    cardOgj.wrong=0;
    cardOgj.right=0;
    typeCard1='';
    typeCard2='';
    createDivs();
    createBoardGame();
  })