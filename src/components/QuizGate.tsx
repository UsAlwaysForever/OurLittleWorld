import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useSharedEffects from '../hooks/useSharedEffects';
import '../css/shared.css';
import '../css/quizGate.css';

function QuizGate() {
  const { volume, setVolume, isMuted, setIsMuted, isPlaying, togglePlayPause } = useSharedEffects('/songs/DilDiyanGallan.mp3');
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<string>('');
  const [error, setError] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const handleSubmit = () => {
    if (answer.toLowerCase() === 'yes') {
      navigate('/home');
    } else {
      setError('Oops! Try again... 💕');
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
    <div className="container quiz-gate">
      <div className="glass-box">
        <h1>One Last Step! 🔐</h1>
        <video 
          ref={videoRef}
          className="quiz-video"
          controls
          loop
          playsInline
        >
          <source src="/videos/quizgate.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p>Do you love me? 🥰</p>
        <div className="quiz-section">
          <input
            type="text"
            placeholder="Yes or No..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button type="button" onClick={handleSubmit}>Submit</button>
          {error && <p className="error">{error}</p>}
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
        <button type="button" onClick={() => navigate('/entry-game')} className="btn">Back ⬅️</button>
      </div>
    </div>
  );
}

export default QuizGate;