import React from 'react';
import { Surah } from '../types';

interface SurahInfoProps {
  surah: Surah;
  darkMode: boolean;
}

const SurahInfo: React.FC<SurahInfoProps> = ({ surah, darkMode }) => {
  return (
    <div className={`mb-6 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} text-center`}>
      <h2 className="text-3xl font-bold mb-2">{surah.name}</h2>
      <h3 className="text-xl mb-2">{surah.englishName}</h3>
      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
        {surah.englishNameTranslation}
      </p>
      <div className="flex justify-center items-center space-x-4 mt-2">
        <span className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          {surah.revelationType}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          {surah.numberOfAyahs} verses
        </span>
      </div>
    </div>
  );
};

export default SurahInfo;