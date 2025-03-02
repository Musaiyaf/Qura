import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import VerseList from './components/VerseList';
import AudioPlayer from './components/AudioPlayer';
import SurahInfo from './components/SurahInfo';
import { quranData, getVerses, getAudioUrl } from './data/quranData';
import { Verse } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(1); // Default to Al-Fatiha
  const [verses, setVerses] = useState<Verse[]>([]);
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    // Check for user preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    
    // Load initial surah
    if (selectedSurah) {
      loadSurah(selectedSurah);
    }
  }, []);

  useEffect(() => {
    // Save dark mode preference
    localStorage.setItem('darkMode', darkMode.toString());
    
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const loadSurah = (surahNumber: number) => {
    const surahVerses = getVerses(surahNumber);
    setVerses(surahVerses);
    setAudioUrl(getAudioUrl(surahNumber));
    setSelectedSurah(surahNumber);
    setSidebarOpen(false); // Close sidebar after selection on mobile
  };

  const handleSelectSurah = (surahNumber: number) => {
    loadSurah(surahNumber);
  };

  // Get current surah object
  const currentSurah = selectedSurah ? quranData.surahs.find(s => s.number === selectedSurah) : null;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        toggleSidebar={toggleSidebar} 
      />
      
      <Sidebar 
        surahs={quranData.surahs} 
        isOpen={sidebarOpen} 
        darkMode={darkMode} 
        onClose={() => setSidebarOpen(false)}
        onSelectSurah={handleSelectSurah}
        selectedSurah={selectedSurah}
      />
      
      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      <main className="container mx-auto px-4 pt-20 pb-4">
        {currentSurah && (
          <>
            <SurahInfo surah={currentSurah} darkMode={darkMode} />
            <VerseList verses={verses} darkMode={darkMode} />
          </>
        )}
      </main>
      
      {selectedSurah && audioUrl && currentSurah && (
        <AudioPlayer 
          audioUrl={audioUrl} 
          darkMode={darkMode}
          surahName={currentSurah.englishName}
        />
      )}
    </div>
  );
}

export default App;