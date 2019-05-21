//start when all loaded
window.onload = function() {
  //console.log("js loaded");
  //declare variables and set initial values
  //there will be turn 1 to turn 9 (at most) in this game
  let turn = 1;
  //nothing is filled in the beginning
  let isFilled = [false, false, false, false, false, false, false, false, false];
  //use an array to store symbols "X" and "O"
  //they are empty in the beginning
  let gameArray = ['', '', '', '', '', '', '', '', ''];
  //define winning condisions in an array; total there are 8 situations
  //numbers are representing the indexes (positions) of the gameArray
  let winArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  //it is false until a player wins the game
  //when it is true and game will stop
  let isWin = false;
  //for grabbing and locating canvas items later
  let currentCanvas;
  let ctx;
  let canvasIndex;
  //get message element for later use
  const message = document.getElementById('message');
  //get the current canvas id in the click event
  const gameArea = document.getElementById('gameArea');
  gameArea.addEventListener('click', function(event) {
    getCanvasID(event.target.id);
    //only draw when space is not filled
    if (!isFilled[canvasIndex] && !isWin) {
      //draw a X when an odd turn
      if (turn % 2 === 1) {
        //draw a X
        ctx.moveTo(20, 20);
        ctx.lineTo(80, 80);
        ctx.moveTo(80, 20);
        ctx.lineTo(20, 80);
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 7;
        ctx.stroke();
        isFilled[canvasIndex] = true;
        gameArray[canvasIndex] = 'X';
        turn++
        //console for checking purpose
        //console.log(gameArray);
        checkWin();
        //console for checking purpose
        //console.log(isWin);
      } else {
        //draw a O when an even turn
        ctx.beginPath();
        ctx.arc(50, 50, 30, 0, 2 * Math.PI);
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 7;
        ctx.stroke();
        isFilled[canvasIndex] = true;
        gameArray[canvasIndex] = 'O';
        turn++
        //console for checking purpose
        //console.log(gameArray);
        checkWin();
        //console for checking purpose
        //console.log(isWin);
      }
    }
  });

  //function to get the clicked canvas' id and its index
  function getCanvasID(canvasID) {
    currentCanvas = document.getElementById(canvasID);
    ctx = currentCanvas.getContext("2d");
    canvasIndex = parseInt(canvasID[6]);
  }

  //function to check if three "X"s or three "O"s are on the winning positions
  function checkWin() {
    let firstIndex;
    let secondIndex;
    let thirdIndex;
    let player;
    for (let i = 0; i < winArray.length; i++) {
      firstIndex = winArray[i][0];
      secondIndex = winArray[i][1];
      thirdIndex = winArray[i][2];
      player = gameArray[firstIndex];
      if (gameArray[firstIndex] === gameArray[secondIndex] && gameArray[firstIndex] === gameArray[thirdIndex] && gameArray[firstIndex]) {
        isWin = true;
        message.innerText = player + " wins!";
      } else if (turn === 10 && !isWin) {
        message.innerText = "It's a draw!";
      }
    }
  }

  //restart a game
  const btnReStartGame = document.getElementById('reStartGame');
  //click Restart Game button to restart a game
  btnReStartGame.addEventListener('click', reStartGame);
  //restart a game by refreshing the page
  function reStartGame() {
    location.reload();
  }
}
