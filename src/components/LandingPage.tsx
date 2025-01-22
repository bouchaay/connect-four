import React from 'react';
import { Play, Circle, ArrowRight } from 'lucide-react';
import { Language } from '../App';
import { translations } from '../translations';

interface LandingPageProps {
  onStart: () => void;
  language: Language;
}

function LandingPage({ onStart, language }: LandingPageProps) {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-8 max-w-4xl w-full">
        <h1 className="text-3xl sm:text-5xl font-bold text-center mb-6 sm:mb-8 text-transparent 
                     bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
          {t.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 mb-8 sm:mb-12">
          <div className="transform hover:scale-105 transition-transform">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">{t.howToPlay}</h2>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <Circle className="text-red-500 mt-1 flex-shrink-0" size={20} />
                <p className="text-sm sm:text-base text-gray-600">{t.rules.dropBalls}</p>
              </li>
              <li className="flex items-start gap-3">
                <Circle className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                <p className="text-sm sm:text-base text-gray-600">{t.rules.ballsFall}</p>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="text-yellow-500 mt-1 flex-shrink-0" size={20} />
                <p className="text-sm sm:text-base text-gray-600">{t.rules.connect4}</p>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 sm:p-6 transform hover:scale-105 transition-transform">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">{t.gameFeatures}</h2>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600">
              <li>• {t.features.scores}</li>
              <li>• {t.features.animations}</li>
              <li>• {t.features.interface}</li>
              <li>• {t.features.localPlay}</li>
              <li>• {t.features.reset}</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-indigo-500 
                     to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:from-indigo-600 
                     hover:to-purple-700 transition-all duration-200 text-base sm:text-lg transform 
                     hover:scale-105"
          >
            <Play size={24} />
            <span>{t.startPlaying}</span>
          </button>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { color: 'bg-red-500', label: t.demo.player1 },
            { color: 'bg-blue-500', label: t.demo.player2 },
            { color: 'bg-yellow-500', label: t.demo.winMatch },
            { color: 'bg-purple-500', label: t.demo.scorePoint },
          ].map((demo, index) => (
            <div key={index} className="text-center transform hover:scale-110 transition-transform">
              <div className={`${demo.color} w-8 h-8 sm:w-12 sm:h-12 rounded-full mx-auto mb-2 
                            animate-bounce shadow-lg`} style={{
                animationDelay: `${index * 200}ms`,
                animationDuration: '2s'
              }}></div>
              <p className="text-xs sm:text-sm text-gray-600">{demo.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;