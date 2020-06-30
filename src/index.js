import "./styles.css";
let boardArr = [];
let player = "X";

const cleanBoard = () => {
  boardArr = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
  ];
};

cleanBoard();

const playTurn = (cell, mark) => {
  let row = -1;
  let col = -1;

  if (cell < 5) {
    row = 0;
    col = cell;
  } else if (cell < 10 && cell > 4) {
    row = 1;
    col = cell - 5;
  } else if (cell < 15 && cell > 9) {
    row = 2;
    col = cell - 10;
  } else if (cell < 20 && cell > 14) {
    row = 3;
    col = cell - 15;
  } else if (cell > 19) {
    row = 4;
    col = cell - 20;
  }
  console.log(row);

  if (row > -1 && boardArr[row][col] === "") {
    boardArr[row][col] = mark;
  }
  console.log(mark);
  console.log(boardArr);
};

const switchPlayer = () => {
  player = player === "X" ? "O" : "X";
};

document.addEventListener("click", event => {
  console.log(event.target.type);
  if (event.target instanceof HTMLTableCellElement) {
    event.preventDefault();
    let pos = event.target.id;
    console.log(pos);
    playTurn(pos, player);
    printBoard();
    checkWin();
    switchPlayer();
  }
});

const allEqual = arr => arr.every(v => v === arr[0] && v !== "");

const checkWin = () => {
  let horarr = [[], [], [], [], []];
  let diagon = [[], []];
  let boardPlain = [];
  let x = 0;

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      horarr[i].push(boardArr[j][i]);
      boardPlain.push(boardArr[i][j]);
    }
  }

  for (let i = 4; i > -1; i--) {
    diagon[0].push(boardArr[i][i]);
    diagon[1].push(boardArr[i][x]);
    x++;
  }

  let combo = horarr.concat(boardArr).concat(diagon);

  combo.forEach(line => {
    let winner = false;
    if (allEqual(line)) {
      if (line[0] === "X") {
        alert("Player 1 won!");
        winner = true;
        cleanBoard();
        printBoard();
        
      } else {
        alert("Player 2 won!");
        winner = true;
        cleanBoard();
        printBoard();
       
      }
    }
  });
  if (!boardPlain.includes("") && !winner) {
    alert("It's a tie!");
    cleanBoard();
    printBoard();
  }
};

const printBoard = () => {
  let board = "<table id='board'>";
  let x = 0;
  for (let i = 0; i < boardArr.length; i++) {
    board += "<tr>";
    for (let j = 0; j < boardArr[i].length; j++) {
      let id = x;
      board +=
        `<td id=${id}> ` +
        boardArr[i][j] +
        "</td>";
      x++;
    }
    board += "</tr>";
  }
  board += "</table>";
  document.getElementById("board").innerHTML = board;
};

printBoard();
