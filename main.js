const player1 = "X";
const player2 = "O";
let turn = 1;
const emptyCell = 0;
const board = [[emptyCell, emptyCell, emptyCell],
[emptyCell, emptyCell, emptyCell],
[emptyCell, emptyCell, emptyCell]];

const resetButton = document.querySelector("#resetBtn");
const gameBtns = document.querySelectorAll(".gameButton");
const winner = document.querySelector("#winner");

function clickedBtn(idBtn, line, col) {
    const button = document.querySelector(`#${idBtn}`);
    const currentPlayer = turn % 2 !== 0 ? player1 : player2;
    board[line][col] = currentPlayer;
    button.innerHTML = currentPlayer;
    button.disabled = true;
    checkBoardFull();
    checkDiagonals();
    checkLines();
    checkColumns();
    turn++;
}

function checkBoardFull() {
    if (board.filter(line => line.includes(emptyCell)).length === 0) {
        setWinner(emptyCell);
    }
}

function checkDiagonals() {
    if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== emptyCell) {
        setWinner(board[0][0]);
    }
    if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== emptyCell) {
        setWinner(board[0][2]);
    }
}

function checkLines() {
    board.forEach(line => {
        if (line.filter(el => el === line[0] && el !== emptyCell).length === line.length) {
            setWinner(line[0]);
        }
    })
}

function checkColumns() {
    for (let i = 0; i < board[0].length; i++) {
        let found = false;
        for (let j = 0; j < board.length; j++) {
            if (board[j][i] === board[0][i] && board[j][i] !== emptyCell) {
                found = true;
            } else {
                found = false;
                break;
            }
        }
        if (found) {
            setWinner(board[0][i]);
            break;
        }
    }
}

function setWinner(player) {
    gameBtns.forEach(btn => btn.disabled = true);
    switch (player) {
        case player1:
            winner.innerHTML = "Player 1 won the game!";
            break;
        case player2:
            winner.innerHTML = "Player 2 won the game!";
            break;
        default:
            winner.innerHTML = "Game Over!";
            break;
    }
};

function resetGame() {
    gameBtns.forEach(btn => {
        btn.innerHTML = "";
        btn.disabled = false;
    });
    board.forEach((_, index) => board[index] = [emptyCell, emptyCell, emptyCell]);
    turn = 1;
    winner.innerHTML = "";
};