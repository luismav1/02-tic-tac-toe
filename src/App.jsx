import { useState } from "react";
import "./App.css";

const TURNS = {
  X: "❌",
  O: "⭕",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`

  const handleClick = () => {
    updateBoard(index);
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  return null;
}
function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  }

  const updateBoard = (index) => {
    // no update this position
    //if has a winner
    if (board[index] || winner) return;

    // update board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // change turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)
    // check for winner
    const newWinner = checkWinner(newBoard);
    if(newWinner){
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  };
  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      {
        winner !== null && (
          <section className="winner">
            <div className="text"> 
              <h2>
                {
                winner === false ? "Empate" : "Ganó: "}
              </h2>

              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Reset del juego</button>
              </footer>

            </div>
            </section>
        
        )
      }
    </main>
  );
}

export default App;
