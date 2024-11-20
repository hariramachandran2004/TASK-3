let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
const statusDisplay = document.getElementById("status");

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle cell click
function handleClick(index) {
  if (board[index] === "" && gameActive) {
    board[index] = currentPlayer;
    const cell = document.getElementById(`cell-${index}`);
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer); // Add class for color styling
    checkResult();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (currentPlayer === "O" && gameActive) {
      setTimeout(computerMove, 500);
    }
  }
}

// Check for win or draw
function checkResult() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerText = `${currentPlayer} has won!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusDisplay.innerText = "It's a draw!";
    gameActive = false;
    return;
  }

  statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
}

// Simple AI move for computer
function computerMove() {
  let availableCells = board.map((cell, index) => (cell === "" ? index : null)).filter(index => index !== null);
  if (availableCells.length > 0) {
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    handleClick(randomIndex);
  }
}

// Reset game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
  document.querySelectorAll(".cell").forEach(cell => {
    cell.innerText = "";
    cell.classList.remove("X", "O"); // Remove class for color styling
  });
}
