import { Link } from 'react-router-dom';
import useSharedEffects from '../hooks/useSharedEffects';
import '../css/shared.css';
import '../css/kdrama.css';

function Kdrama() {
  const { volume, setVolume, isMuted, setIsMuted, isPlaying, togglePlayPause } = useSharedEffects('/songs/tumse.mp3');
  const kdramas: string[] = [
    'You are my Sun Shine! 💫',
    'Crash Landing on you! 🌟',
    'Descendants of the sun',
    'One Spring Night',
    'Because This Is My First Life',
    
  ];

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="container">
      <div className="glass-box">
        <h1>K-drama Nights 🎬</h1>
        <p>Our binge-watch list...</p>
        <p>Mujhe itne to nhi pta but ha Ye saare K-dramas sath mai dekhge and jo bhi tum bologi vo bhi...</p>
        <div className="kdrama-container">
          {kdramas.map((kdrama, index) => (
            <div key={index} className="kdrama">
              <p>{kdrama}</p>
            </div>
          ))}
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

export default Kdrama;