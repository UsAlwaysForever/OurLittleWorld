import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSharedEffects from '../hooks/useSharedEffects';
import '../css/shared.css';
import '../css/countdown.css';

function TimeCounter() {
  const { volume, setVolume, isMuted, setIsMuted, isPlaying, togglePlayPause } = useSharedEffects('/songs/Galliyan.mp3');
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [timePassed, setTimePassed] = useState<{ days: number; hours: number; minutes: number; seconds: number } | string>('');

  const importantDates = [
    { date: new Date('2024-11-15T20:00:00'), label: 'The Day We Met as Ride Along ❤️' },
    { date: new Date('2024-11-17T02:25:00'), label: 'The Day We Met on discord❤️' },
    { date: new Date('2025-03-05T02:24:00'), label: 'The Day I Proposed 💍 and you said yes🥰' },
    { date: new Date('2025-03-03T14:00:00'), label: 'Till when will we be together? ❤️' },
  ];

  useEffect(() => {
    const updateCounter = () => {
      if (selectedDateIndex === 3) {
        setTimePassed('infinity');
        return;
      }

      const now = new Date();
      const difference = now.getTime() - importantDates[selectedDateIndex].date.getTime();

      if (difference <= 0) {
        setTimePassed('Abhi toh shuru bhi nahi hua! ⏰');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setTimePassed({ days, hours, minutes, seconds });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, [selectedDateIndex]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDateIndex(parseInt(e.target.value));
  };

  return (
    <div className="container">
      <div className="glass-box">
        <h1>Humara Time ❤️</h1>
        <p>Jab se hum saath aaye...</p>
        <select onChange={handleDateChange} value={selectedDateIndex}>
          {importantDates.map((date, index) => (
            <option key={index} value={index}>
              {date.label}
            </option>
          ))}
        </select>
        <div id="countdown">
          {timePassed === 'infinity' ? (
            <div className="infinity-display">
            <div className="infinity-icon">♾️</div>
            <p className="pop-up-text">❤️ Forever till Infinity ❤️</p>
          </div>
          ) : typeof timePassed === 'string' ? (
            timePassed
          ) : (
            <>
              <span>{timePassed.days}</span>d <span>{timePassed.hours}</span>h <span>{timePassed.minutes}</span>m <span>{timePassed.seconds}</span>s
            </>
          )}
        </div>
      </div>
      <div className="volume-control">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
        />
        <button type="button" onClick={toggleMute}>
          {isMuted ? '🔇' : '🔊'}
        </button>
        <button type="button" onClick={togglePlayPause}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      </div>
      <div className="nav-buttons">
        <Link to="/home" className="btn">Home 🏠</Link>
        <button type="button" onClick={() => window.history.back()} className="btn">Back ⬅️</button>
      </div>
    </div>
  );
}

export default TimeCounter;