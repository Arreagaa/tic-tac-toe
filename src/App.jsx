import { useState } from "react";
import confetti from "canvas-confetti";
import { Board } from "./components/Board.jsx";
import { Turns } from "./components/Turns.jsx";
import { TURNS } from "./constants.js";
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { saveGameToStorage, resetGameStorage } from "./logic/storage/index.js";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });
  const [winner, setWinner] = useState(() => {
    const winnerFromStorage = window.localStorage.getItem("winner");
    if (winnerFromStorage === "null") return null;
    return winnerFromStorage;
  });

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  };

  const updateBoard = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //save game
    /*saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });*/

    let newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
      newWinner = false;
    }
    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
      winner: newWinner,
    });
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset the game</button>
      <Board board={board} updateBoard={updateBoard} />

      <Turns turn={turn} />

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
