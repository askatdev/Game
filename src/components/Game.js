import React, { useState, useEffect } from 'react';
import "./Game.css"

const initialState = Array(9).fill(null);

function Game() {
  const [board, setBoard] = useState(initialState);
  const [isXNext, setIsXNext] = useState(true);
  const [isNewGame, setIsNewGame] = useState(false);

  useEffect(() => {
    if (!isXNext && !isNewGame) {
      makeComputerMove();
    }
  }, [board, isXNext, isNewGame]);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board) || isNewGame) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';

    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const makeComputerMove = () => {
    const availableMoves = board.map((square, index) => (square ? null : index));

    for (const move of availableMoves) {
      const newBoard = board.slice();
      newBoard[move] = 'O';
      if (calculateWinner(newBoard) === 'O') {
        setTimeout(() => handleClick(move), 500);
        return;
      }
    }

    for (const move of availableMoves) {
      const newBoard = board.slice();
      newBoard[move] = 'X';
      if (calculateWinner(newBoard) === 'X') {
        setTimeout(() => handleClick(move), 500);
        return;
      }
    }

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const computerMove = availableMoves[randomIndex];

    if (computerMove !== undefined) {
      setTimeout(() => {
        handleClick(computerMove);
      }, 500);
    }
  };

  const resetGame = () => {
    setBoard(initialState);
    setIsXNext(true);
    setIsNewGame(false);
  };

  const renderSquare = (index) => (
    <button
      className={`square ${board[index] ? '' : 'hovered'}`}
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  const winner = calculateWinner(board);
  let status;

  if (winner) {
    status = `Победитель: ${winner}`;
  } else if (board.every((square) => square !== null)) {
    status = 'Ничья!';
  } else {
    status = `Следующий игрок: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="status">{status}</div>
        <div className="board-row">
          <span>{renderSquare(0)}</span>
          <span>{renderSquare(1)}</span>
          <span>{renderSquare(2)}</span>
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="new-game-button" onClick={resetGame}>
          Начать новую игру
        </button>
      {/* {isNewGame ? (
        <button className="new-game-button" onClick={resetGame}>
          Начать новую игру
        </button>
      ) : (
        // <button className="new-game-button" onClick={() => setIsNewGame(true)}>
        // Остонавить игру
        // </button>
      )} */}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default Game;
