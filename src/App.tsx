import React, { useState } from 'react';
import { Trophy, Home, RotateCcw, XCircle, Languages } from 'lucide-react';
import GameBoard from './components/GameBoard';
import LandingPage from './components/LandingPage';
import { translations } from './translations';

export type Player = 1 | 2;
export type Cell = Player | null;
export type Board = Cell[][];
export type Language = 'en' | 'fr';

export const ROWS = 6;
export const COLS = 7;
export const WINNING_LENGTH = 4;

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  const handleGameWin = (winner: Player) => {
    setScores(prev => ({
      ...prev,
      [`player${winner}`]: prev[`player${winner}`] + 1
    }));
  };

  const resetScores = () => {
    setScores({ player1: 0, player2: 0 });
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  if (showLanding) {
    return (
      <>
        <button
          onClick={toggleLanguage}
          className="fixed top-4 right-4 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm 
                   rounded-lg shadow-lg text-gray-700 hover:bg-white transition-all z-50"
        >
          <Languages size={20} />
          <span>{language.toUpperCase()}</span>
        </button>
        <LandingPage onStart={() => setShowLanding(false)} language={language} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4 overflow-x-hidden">
      <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-8 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => setShowLanding(true)}
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 text-gray-600 hover:text-gray-800 
                     transition-colors text-sm sm:text-base"
          >
            <Home size={20} />
            <span>{t.home}</span>
          </button>
          <h1 className="text-2xl sm:text-4xl font-bold text-transparent bg-clip-text 
                       bg-gradient-to-r from-indigo-500 to-purple-600 text-center flex-grow sm:flex-grow-0">
            {t.title}
          </h1>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 text-gray-600 
                     hover:text-gray-800 transition-colors text-sm sm:text-base"
          >
            <Languages size={20} />
            <span>{language.toUpperCase()}</span>
          </button>
        </div>

        {/* Score Cards - Mobile */}
        <div className="flex justify-between gap-4 mb-6 sm:hidden">
          <div className="flex-1 bg-gradient-to-br from-red-100 to-red-50 p-3 rounded-xl shadow-md">
            <h2 className="text-sm font-semibold text-red-700 mb-1">{t.player1}</h2>
            <div className="flex items-center gap-1">
              <Trophy className="text-red-500" size={16} />
              <span className="text-xl font-bold text-red-600">{scores.player1}</span>
            </div>
          </div>
          <div className="flex-1 bg-gradient-to-br from-blue-100 to-blue-50 p-3 rounded-xl shadow-md">
            <h2 className="text-sm font-semibold text-blue-700 mb-1">{t.player2}</h2>
            <div className="flex items-center gap-1">
              <Trophy className="text-blue-500" size={16} />
              <span className="text-xl font-bold text-blue-600">{scores.player2}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          {/* Player 1 Score Card - Desktop */}
          <div className="hidden md:block bg-gradient-to-br from-red-100 to-red-50 p-6 rounded-xl 
                        shadow-md transform hover:scale-105 transition-transform">
            <h2 className="text-xl font-semibold text-red-700 mb-2">{t.player1}</h2>
            <div className="flex items-center gap-2">
              <Trophy className="text-red-500" size={24} />
              <span className="text-3xl font-bold text-red-600">{scores.player1}</span>
            </div>
          </div>

          {/* Game Board */}
          <div className="md:col-span-1">
            <GameBoard onWin={handleGameWin} language={language} />
          </div>

          {/* Player 2 Score Card - Desktop */}
          <div className="hidden md:block bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-xl 
                        shadow-md transform hover:scale-105 transition-transform">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">{t.player2}</h2>
            <div className="flex items-center gap-2">
              <Trophy className="text-blue-500" size={24} />
              <span className="text-3xl font-bold text-blue-600">{scores.player2}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6 sm:mt-8">
          <button
            onClick={resetScores}
            className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gray-100 text-gray-700 
                     rounded-lg font-semibold shadow-md hover:bg-gray-200 transition-all duration-200
                     transform hover:scale-105 text-sm sm:text-base"
          >
            <XCircle size={20} />
            <span>{t.resetScores}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;