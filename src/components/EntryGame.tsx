import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useSharedEffects from '../hooks/useSharedEffects';
import '../css/shared.css';
import '../css/entryGame.css';

function EntryGame() {
  const { volume, setVolume, isMuted, setIsMuted, isPlaying, togglePlayPause } = useSharedEffects('/songs/IkVaariAa.mp3');
  const navigate = useNavigate();
  const [position, setPosition] = useState({ x: 50, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const handleMouseEnter = () => {
    const glassBox = document.querySelector('.glass-box') as HTMLElement;
    const btn = document.querySelector('.no-btn') as HTMLElement;

    if (glassBox && btn) {
      const boxRect = glassBox.getBoundingClientRect();
      const btnWidth = btn.offsetWidth;
      const btnHeight = btn.offsetHeight;

      const maxX = boxRect.width - btnWidth - 20;
      const maxY = boxRect.height - btnHeight - 20;
      const newX = Math.random() * maxX - maxX / 2;
      const newY = Math.random() * maxY - maxY / 2;

      setPosition({ x: newX, y: newY });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(false);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = false;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="container entry-game">
      <div className="glass-box">
        <h1>Hey Cutie! ❤️</h1>
        <video 
          ref={videoRef}
          className="entry-video"
          controls
          loop
          playsInline
        >
          <source src="/videos/entrygame.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p>Do you wanna really go in?</p>
        <div className="buttons">
          <button type="button" className="btn yes-btn" onClick={() => navigate('/quiz-gate')}>
            Yes 😊
          </button>
          <button
            type="button"
            className="btn no-btn"
            onMouseEnter={handleMouseEnter}
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              transition: 'transform 0.3s ease',
              position: 'relative',
            }}
          >
            No 😜
          </button>
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
    </div>
  );
}

export default EntryGame;