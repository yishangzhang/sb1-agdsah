import React, { useState, useCallback } from 'react';
import Board from './components/Board';
import { RefreshCw } from 'lucide-react';

const BOARD_SIZE = 15;

const App: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[][]>(
    Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = useCallback((row: number, col: number) => {
    const directions = [
      [1, 0], [0, 1], [1, 1], [1, -1]
    ];

    for (const [dx, dy] of directions) {
      let count = 1;
      for (let i = 1; i < 5; i++) {
        const newRow = row + i * dx;
        const newCol = col + i * dy;
        if (
          newRow < 0 || newRow >= BOARD_SIZE ||
          newCol < 0 || newCol >= BOARD_SIZE ||
          board[newRow][newCol] !== currentPlayer
        ) {
          break;
        }
        count++;
      }
      for (let i = 1; i < 5; i++) {
        const newRow = row - i * dx;
        const newCol = col - i * dy;
        if (
          newRow < 0 || newRow >= BOARD_SIZE ||
          newCol < 0 || newCol >= BOARD_SIZE ||
          board[newRow][newCol] !== currentPlayer
        ) {
          break;
        }
        count++;
      }
      if (count >= 5) {
        return true;
      }
    }
    return false;
  }, [board, currentPlayer]);

  const handleClick = useCallback((row: number, col: number) => {
    if (winner || board[row][col]) return;

    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    if (checkWinner(row, col)) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  }, [board, currentPlayer, winner, checkWinner]);

  const resetGame = () => {
    setBoard(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Gomoku (五子棋)</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <Board board={board} onClick={handleClick} />
        <div className="mt-4 text-center">
          {winner ? (
            <p className="text-2xl font-bold">
              Winner: {winner === 'X' ? 'Black' : 'White'}
            </p>
          ) : (
            <p className="text-xl">
              Current Player: {currentPlayer === 'X' ? 'Black' : 'White'}
            </p>
          )}
        </div>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full"
          onClick={resetGame}
        >
          <RefreshCw className="mr-2" size={20} />
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default App;