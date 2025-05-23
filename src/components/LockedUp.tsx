import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useSharedEffects from '../hooks/useSharedEffects';
import '../css/shared.css';
import '../css/lockedUp.css';

interface Heart {
  id: number;
  left: string;
  animationDuration: string;
}

function LockedUp() {
  const { volume, setVolume, isMuted, setIsMuted, isPlaying, togglePlayPause } = useSharedEffects('/songs/TeraHoneLagaHoon.mp3');
  const navigate = useNavigate();
  const location = useLocation();
  const [hearts, setHearts] = useState<Heart[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get('message') || 'No message provided';

  useEffect(() => {
    let heartId = 0;

    const createHeart = () => {
      const newHeart: Heart = {
        id: heartId++,
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 3 + 2}s`,
      };

      setHearts((prevHearts) => [...prevHearts, newHeart]);

      setTimeout(() => {
        setHearts((prevHearts) => prevHearts.filter((heart) => heart.id !== newHeart.id));
      }, parseFloat(newHeart.animationDuration) * 1000);
    };

    const heartInterval = setInterval(createHeart, 500);
    return () => clearInterval(heartInterval);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

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
    <div className="container locked-up-page">
      <div className="glass-box">
        <h1>We’re Now Locked Up Together! 🔒❤️</h1>
        <video 
          ref={videoRef}
          className="locked-up-video"
          controls
          loop
          playsInline
        >
          <source src="/videos/final.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p>Forever and always, my love... 🥰</p>
        <div className="lock-emoji">🔐</div>
        <p className="cute-message">Our hearts are tied with an invisible string! 💞</p>
        <p className="cute-message">You said: {message}</p>
        <div className="sparkles">✨✨✨</div>
      </div>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="falling-heart"
          style={{
            left: heart.left,
            animationDuration: heart.animationDuration,
          }}
        >
          💖
        </div>
      ))}
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
        <button type="button" onClick={() => navigate('/home')} className="btn">Home 🏠</button>
        <button type="button" onClick={() => navigate('/proposal')} className="btn">Back to Proposal 💍</button>
      </div>
    </div>
  );
}

export default LockedUp;