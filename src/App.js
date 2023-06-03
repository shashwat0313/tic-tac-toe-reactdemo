import { useEffect, useState } from 'react';


function Square({ value, onSquareClick }) {

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {

  const [squares, setsquare] = useState(Array(9).fill(null))
  const [isXnext, setnext] = useState(true);
  let winner;
  function checkWin(newSquares) {
    if(newSquares == null){
      return null;
    }
    // console.log("checkwin is running on the array: " + newSquares);
    //left diagonal
    if (newSquares[0] == newSquares[4] && newSquares[4] == newSquares[8]) {
      if (newSquares[0] == 'X') {
        return "X";

      }
      else if (newSquares[0] == 'O') {
        return "O";
      }
    }
    //right diagonal
    else if (newSquares[2] == newSquares[4] && newSquares[4] == newSquares[6]) {
      if (newSquares[2] == 'X') {
        return "X";
      }
      else if (newSquares[2] == 'O') {
        return "O";
      }
    }
    //rows
    for (let i = 0; i <= 2; i++) {
      if (newSquares[(3 * i)] == newSquares[(3 * i + 1)] && newSquares[(3 * i + 1)] == newSquares[(3 * i + 2)]) {
        if (newSquares[3 * i] == "X") {
          return "X";
        }
        else if (newSquares[3 * i] == 'O') {
          return "O";
        }
      }
    }
    //columns
    for (let i = 0; i <= 2; i++) {
      if (newSquares[3 * 0 + i] == newSquares[3 * 1 + i] && newSquares[3 * 1 + i] == newSquares[3 * 2 + i]) {
        // console.log("found " + (3 * 0 + i) + " " + (3 * 1 + i) + " " + (3 * 2 + i) + " same");
        if (newSquares[3 * 2 + i] == "X") {
          return "X";
        }
        else if (newSquares[3 * 2 + i] == 'O') {
          return "O";
        }
      }
    }
    return null;
  }

  function clickHandler(i) {
    //we need to make a shallow copy of the squares array
    const updatedSquares = squares.slice();
    if (isXnext === true) {
      if (updatedSquares[i] == null) {
        updatedSquares[i] = 'X';
      }
      setnext(false);
    }
    else {
      if (updatedSquares[i] == null) {
        updatedSquares[i] = 'O';
      }
      setnext(true);
    }

    setsquare(updatedSquares);
    checkWin(updatedSquares);
  }

  let status;
  if(checkWin(squares)){
    status = "WE HAVE A WINNER ! ..... " + checkWin(squares);
  }
  else{
    if(isXnext){
      status = "Next turn : X";
    }
    else{
      status = "Next turn : O";
    }
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => clickHandler(0)} />
        <Square value={squares[1]} onSquareClick={() => clickHandler(1)} />
        <Square value={squares[2]} onSquareClick={() => clickHandler(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => clickHandler(3)} />
        <Square value={squares[4]} onSquareClick={() => clickHandler(4)} />
        <Square value={squares[5]} onSquareClick={() => clickHandler(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => clickHandler(6)} />
        <Square value={squares[7]} onSquareClick={() => clickHandler(7)} />
        <Square value={squares[8]} onSquareClick={() => clickHandler(8)} />
      </div>
    </div>
  );
}
