import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string;
  darkMode: boolean;
  surahName: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, darkMode, surahName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Reset player when audio URL changes
    setIsPlaying(false);
    setCurrentTime(0);
    
    // Load metadata for the new audio
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [audioUrl]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} shadow-lg p-3`}>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      
      <div className="container mx-auto">
        <div className="flex flex-col">
          <div className="text-center mb-2">
            <p className="text-sm font-medium">{surahName}</p>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full mx-2 h-1 bg-gray-300 dark:bg-gray-700 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${darkMode ? '#4F46E5' : '#3B82F6'} 0%, ${darkMode ? '#4F46E5' : '#3B82F6'} ${(currentTime / duration) * 100}%, ${darkMode ? '#374151' : '#D1D5DB'} ${(currentTime / duration) * 100}%, ${darkMode ? '#374151' : '#D1D5DB'} 100%)`
              }}
            />
            <span className="text-xs">{formatTime(duration)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Volume2 size={16} className="mr-2" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-300 dark:bg-gray-700 rounded-full appearance-none cursor-pointer"
              />
            </div>
            
            <div className="flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <SkipBack size={20} />
              </button>
              <button 
                onClick={togglePlay}
                className={`p-3 mx-2 rounded-full ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <SkipForward size={20} />
              </button>
            </div>
            
            <div className="w-24"></div> {/* Empty div for balance */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;