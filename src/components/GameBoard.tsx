import React, { useState } from 'react';
import { Trophy, RotateCcw } from 'lucide-react';
import { Player, Cell, Board, ROWS, COLS, WINNING_LENGTH, Language } from '../App';
import { translations } from '../translations';

interface GameBoardProps {
  onWin: (winner: Player) => void;
  language: Language;
}

function GameBoard({ onWin, language }: GameBoardProps) {
  const [board, setBoard] = useState<Board>(() => 
    Array(ROWS).fill(null).map(() => Array(COLS).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningCells, setWinningCells] = useState<[number, number][]>([]);
  const [isDropping, setIsDropping] = useState(false);
  const t = translations[language];

  const checkWin = (row: number, col: number, player: Player): boolean => {
    const directions = [
      [[0, 1], [0, -1]], // horizontal
      [[1, 0], [-1, 0]], // vertical
      [[1, 1], [-1, -1]], // diagonal
      [[1, -1], [-1, 1]] // other diagonal
    ];

    for (const [dir1, dir2] of directions) {
      let count = 1;
      const winning: [number, number][] = [[row, col]];

      for (const [dx, dy] of [dir1, dir2]) {
        let r = row + dx;
        let c = col + dy;
        
        while (
          r >= 0 && r < ROWS && 
          c >= 0 && c < COLS && 
          board[r][c] === player
        ) {
          count++;
          winning.push([r, c]);
          r += dx;
          c += dy;
        }
      }

      if (count >= WINNING_LENGTH) {
        setWinningCells(winning);
        return true;
      }
    }
    return false;
  };

  const dropBall = (col: number) => {
    if (winner || isDropping) return;

    setIsDropping(true);
    let row = 0;

    while (row < ROWS && board[row][col] === null) {
      row++;
    }
    row--;

    if (row >= 0) {
      const newBoard = board.map(row => [...row]);
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);

      if (checkWin(row, col, currentPlayer)) {
        setWinner(currentPlayer);
        onWin(currentPlayer);
      } else {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      }
    }
    
    setTimeout(() => setIsDropping(false), 500);
  };

  const resetGame = () => {
    setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
    setCurrentPlayer(1);
    setWinner(null);
    setWinningCells([]);
  };

  return (
    <div className="w-full">
      <div className="text-center mb-3 sm:mb-4">
        {winner ? (
          <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-semibold">
            <Trophy className="text-yellow-500" />
            <span className={`${winner === 1 ? 'text-red-500' : 'text-blue-500'}`}>
              {t.wins.replace('{player}', String(winner))}
            </span>
          </div>
        ) : (
          <p className="text-lg sm:text-xl text-gray-600 flex items-center justify-center gap-2">
            {t.playerTurn.replace('{player}', String(currentPlayer))}
            <span className={`inline-block w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
              currentPlayer === 1 ? 'bg-red-500' : 'bg-blue-500'
            }`}></span>
          </p>
        )}
      </div>

      <div className="bg-indigo-100 p-2 sm:p-4 rounded-lg transform hover:scale-[1.02] transition-transform">
        <div className="grid grid-cols-7 gap-1 sm:gap-2 bg-indigo-200 p-2 sm:p-4 rounded-lg">
          {board.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  aspect-square rounded-full transition-all duration-300
                  ${cell === null ? 'bg-white' : ''}
                  ${cell === 1 ? 'bg-red-500' : ''}
                  ${cell === 2 ? 'bg-blue-500' : ''}
                  ${winningCells.some(([r, c]) => r === rowIndex && c === colIndex) 
                    ? 'animate-pulse shadow-lg ring-2 ring-yellow-400' : ''}
                  ${!winner && !cell && !isDropping 
                    ? 'cursor-pointer hover:bg-gray-100 hover:scale-95' : ''}
                  shadow-inner
                `}
                onClick={() => dropBall(colIndex)}
              />
            ))
          ))}
        </div>
      </div>

      {winner && (
        <div className="mt-3 sm:mt-4 text-center">
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-500 
                     to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:from-indigo-600 
                     hover:to-purple-700 transition-all duration-200 mx-auto transform hover:scale-105
                     text-sm sm:text-base"
          >
            <RotateCcw size={20} />
            <span>{t.playAgain}</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default GameBoard;