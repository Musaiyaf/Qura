import React from 'react';
import { Moon, Sun, Menu } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, toggleSidebar }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-10 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} shadow-md`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold">Quranly</h1>
        </div>
        <div className="flex items-center">
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <a 
            href="https://musaiyaf.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-4 text-sm hover:underline"
          >
            Created by Musaiyaf
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;