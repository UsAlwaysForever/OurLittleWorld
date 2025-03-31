import { Link } from 'react-router-dom';
import useSharedEffects from '../hooks/useSharedEffects';
import '../css/shared.css';
import '../css/foodie.css';

function Foodie() {
  const { volume, setVolume, isMuted, setIsMuted, isPlaying, togglePlayPause } = useSharedEffects('/songs/PehliNazarMein.mp3');
  const foods: string[] = [
    'Tumhara Favorite Burger 🍔',
    'Mera Favorite Pizza 🍕',
    'Thosa fat badane ke liye chilli potato 🥔',
    'Aur delhi ki famous chij kese miss kar sakte hai MOMOS to pakka kayege 🥰',
    'Thoda desi khana bhi khayege Dal Makhni, Chaap, Naan aur bhi boht kuch 😍',
    'Phir raat ko Ice cream bhi chahiye na Cone khayege Kulfi, Kasata, chocolate pura thela hi kha lenge 🤭',
    'Aur late night ke liye bhi to kuch chhaiye bhug lagi to maggie banake khayege sath mai 🍜',
    'aur ab last mai kya bachta hai hmmm socho socho niche likha hai vese 🥰',
    'Ek dusro ko bhi to khana hai bhul gyi? ek dum pyaar se khauga tumhe.. Yummm Yummm Yummmm 🤭😜🥰',
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
        <h1>Foodie 🍰</h1>
        <p>Oye meri bhukkad🤣...  Ye sab chije mai tujhe khilauga apne hatho se and thoda boht thusuga bhi 🤭... aur kuch chije khud banake bhi khilauga motu 💕</p>
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

export default Foodie;