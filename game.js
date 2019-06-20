'use strict';

const gameTable = document.querySelector('.game__table tbody');
const enterButton = document.querySelector('.game__enter');
const win = document.querySelector('.game__win');

win.style.display = "block";

//-------Quit Button-------------//

const quitButton = document.querySelector('.game__quit');
quitButton.onclick = () => {
  if (confirm('Do you want to quit?')) {
    window.close();
  }
}
//-------End Quit Button----------//

//-------New Game Button----------//
function randomFromZeroToN(n) {
  return Math.floor(Math.random() * n);
}
//---------------
function newGame() {
  let numbers = [0,1,2,3,4,5,6,7,8,9];
  let i = 0;
  let result = '';
  
  while (i < 4) {
    let n = numbers.length;
    let index = randomFromZeroToN(n);
    result += numbers[index];
    numbers.splice(index, 1);
    i++;
  }
  
  return result;
}
//---------------
let hiddenNumber = '';

const newGameButton = document.querySelector('.game__new-game');

newGameButton.onclick = () => {
  hiddenNumber = newGame();
  console.log(hiddenNumber);

  gameTable.innerHTML = '';
  win.style.transform = "scale(0)";

  document.querySelector('.game__your-number').disabled = false;
  enterButton.disabled = false;
}
//-------End New Game Button----------//

//-------Game Enter Button------------//
function bullsOrCows(str1, str2) {
  let bulls = 0;
  let cows = 0;
  
  for (let i = 0; i < str1.length; i++) {
    switch (str2.indexOf(str1[i])) {
      case i: 
        bulls++;
        break;
      case -1:
        break;
      default:
        cows++;
    }
  }
  
  return `${bulls}Bulls, ${cows}Cows`;
}  
//----------------------

enterButton.onclick = () => {
  const yourNumber = document.querySelector('.game__your-number');
  const bullsAndCows = bullsOrCows(hiddenNumber, yourNumber.value);
  
  if (!(/[0-9]{4}/.test(yourNumber.value))) {
    yourNumber.value = '';
    return alert('Enter a number');
  }

  // Add new row to guess table
  let newRow = document.createElement('tr');

  newRow.innerHTML = `
    <td>${Number(gameTable.children.length) + 1}</td>
    <td>${yourNumber.value}</td>
    <td>${bullsAndCows}</td>
    `;

  gameTable.appendChild(newRow);
  // End -add new row to guess table-

  yourNumber.value = ''; 

  if (bullsAndCows[0] === '4') {
    document.querySelector('.game__your-number').disabled = true;
    enterButton.disabled = true;

    win.innerHTML = `
    !! You win !!<br>
    Hidden number is ${hiddenNumber}
    `;
    
    win.style.transform = "scale(1)";
  }
}
//-------End Game Enter Button----------//

function pressEnter(event) {
  if (event.keyCode === 13) {
    enterButton.click();
  }
}