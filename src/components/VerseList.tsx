import React from 'react';
import { Verse } from '../types';

interface VerseListProps {
  verses: Verse[];
  darkMode: boolean;
}

const VerseList: React.FC<VerseListProps> = ({ verses, darkMode }) => {
  return (
    <div className="pb-24"> {/* Add padding at bottom for audio player */}
      {verses.map((verse) => (
        <div 
          key={verse.number}
          className={`mb-8 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${darkMode ? 'bg-indigo-600' : 'bg-blue-500'} text-white text-sm`}>
              {verse.number}
            </span>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-xl leading-loose" dir="rtl">{verse.text}</p>
          </div>
          
          <div>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{verse.translation}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerseList;