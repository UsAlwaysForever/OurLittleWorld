import { Link } from 'react-router-dom';
import useSharedEffects from '../hooks/useSharedEffects';
import '../css/shared.css';
import '../css/foodie.css';

function Foodie() {
  const { volume, setVolume, isMuted, setIsMuted } = useSharedEffects();
  const foods: string[] = [
    'Our pizza dates 🍕',
    'That ice cream we shared 🍦',
    'Late-night ramen nights 🍜',
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
        <h1>Foodie Moments 🍰</h1>
        <p>Our tasty adventures...</p>
        <div className="foodie-container">
          {foods.map((food, index) => (
            <div key={index} className="food">
              <p>{food}</p>
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

export default Foodie;