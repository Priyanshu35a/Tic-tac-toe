    const board = document.getElementById("board");
    const statusText = document.getElementById("status");

    let cells = [];
    let currentPlayer = "X"; 
    let gameOver = false;

    // Create 9 cells
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.addEventListener("click", () => makeMove(cell, i));
      board.appendChild(cell);
      cells.push(cell);
    }

    function makeMove(cell, index) {
      if (cell.textContent !== "" || gameOver) return;

      cell.textContent = currentPlayer;
      cell.classList.add("taken");

      const winnerLine = checkWinner();
      if (winnerLine) {
        statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
        highlightWin(winnerLine);
        gameOver = true;
        return;
      }

      if (isDraw()) {
        statusText.textContent = "😅 It's a draw!";
        gameOver = true;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkWinner() {
      const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8], 
        [0,3,6],[1,4,7],[2,5,8], 
        [0,4,8],[2,4,6]
      ];

      for (let pattern of winPatterns) {
        if (
          cells[pattern[0]].textContent === currentPlayer &&
          cells[pattern[1]].textContent === currentPlayer &&
          cells[pattern[2]].textContent === currentPlayer
        ) {
          return pattern;
        }
      }
      return null;
    }

    function highlightWin(pattern) {
      pattern.forEach(index => {
        cells[index].classList.add("win");
      });
    }

    function isDraw() {
      return cells.every(cell => cell.textContent !== "");
    }

    function resetGame() {
      cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken", "win");
      });
      currentPlayer = "X";
      gameOver = false;
      statusText.textContent = "Player X's turn";
    }