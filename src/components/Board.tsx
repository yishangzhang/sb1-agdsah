import React from 'react';

interface BoardProps {
  board: (string | null)[][];
  onClick: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onClick }) => {
  return (
    <div className="grid grid-cols-15 gap-0.5 bg-gray-300 p-0.5">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            className={`w-8 h-8 flex items-center justify-center ${
              cell ? (cell === 'X' ? 'bg-black' : 'bg-white') : 'bg-yellow-200 hover:bg-yellow-100'
            }`}
            onClick={() => onClick(rowIndex, colIndex)}
            disabled={!!cell}
          >
            {cell && (
              <div className={`w-7 h-7 rounded-full ${cell === 'X' ? 'bg-black' : 'bg-white'} border-2 border-gray-700`} />
            )}
          </button>
        ))
      )}
    </div>
  );
};

export default Board;