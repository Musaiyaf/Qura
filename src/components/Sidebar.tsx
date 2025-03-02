import React from 'react';
import { X, Search } from 'lucide-react';
import { Surah } from '../types';

interface SidebarProps {
  surahs: Surah[];
  isOpen: boolean;
  darkMode: boolean;
  onClose: () => void;
  onSelectSurah: (surahNumber: number) => void;
  selectedSurah: number | null;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  surahs, 
  isOpen, 
  darkMode, 
  onClose, 
  onSelectSurah,
  selectedSurah
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredSurahs = surahs.filter(surah => 
    surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.englishNameTranslation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.number.toString().includes(searchTerm)
  );

  return (
    <div 
      className={`fixed top-0 left-0 h-full w-72 z-20 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg pt-16 overflow-y-auto`}
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <X size={20} />
      </button>
      
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Surahs</h2>
        
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search surah..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-2 pl-10 rounded-md ${
              darkMode 
                ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                : 'bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-300'
            } border focus:outline-none focus:ring-2 ${
              darkMode ? 'focus:ring-indigo-500' : 'focus:ring-blue-500'
            }`}
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        
        <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
          <ul>
            {filteredSurahs.map((surah) => (
              <li key={surah.number}>
                <button
                  onClick={() => onSelectSurah(surah.number)}
                  className={`w-full text-left py-2 px-3 rounded-md mb-1 transition-colors ${
                    selectedSurah === surah.number 
                      ? (darkMode ? 'bg-gray-700' : 'bg-gray-200') 
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{surah.number}. {surah.englishName}</span>
                    <span className="text-sm">{surah.name}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {surah.englishNameTranslation} • {surah.numberOfAyahs} verses
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;