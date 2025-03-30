import { useState, useEffect } from 'react';
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
  const { volume, setVolume, isMuted, setIsMuted } = useSharedEffects();
  const navigate = useNavigate();
  const location = useLocation();
  const [hearts, setHearts] = useState<Heart[]>([]);
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="container locked-up-page">
      <div className="glass-box">
        <h1>We’re Now Locked Up Together! 🔒❤️</h1>
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
      </div>
      <div className="nav-buttons">
        <button type="button" onClick={() => navigate('/home')} className="btn">Home 🏠</button>
        <button type="button" onClick={() => navigate('/proposal')} className="btn">Back to Proposal 💍</button>
      </div>
    </div>
  );
}

export default LockedUp;