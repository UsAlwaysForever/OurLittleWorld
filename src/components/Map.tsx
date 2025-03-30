import { Link } from 'react-router-dom';
import useSharedEffects from '../hooks/useSharedEffects';
import '../css/shared.css';
import '../css/map.css';

function Map() {
  const { volume, setVolume, isMuted, setIsMuted } = useSharedEffects();
  const locations: string[] = [
    'The cafe where we met ☕',
    'Our favorite pizza place 🍕',
    'The park where we danced 🌳',
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
        <h1>Our Map 🌍</h1>
        <p>Places we’ve been...</p>
        <div className="map-container">
          {locations.map((location, index) => (
            <div key={index} className="location">
              <p>{location}</p>
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
      </div>
      <div className="nav-buttons">
        <Link to="/home" className="btn">Home 🏠</Link>
        <button type="button" onClick={() => window.history.back()} className="btn">Back ⬅️</button>
      </div>
    </div>
  );
}

export default Map;