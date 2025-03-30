import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSharedEffects from '../hooks/useSharedEffects';
import '../css/shared.css';
import '../css/memories.css';

interface Heart {
  id: number;
  left: string;
  animationDuration: string;
}

interface Memory {
  id: number;
  title: string;
  description: string;
  emoji: string;
  date: string;
}

function Memories() {
  const { volume, setVolume, isMuted, setIsMuted, isPlaying, togglePlayPause } = useSharedEffects();
  const navigate = useNavigate();
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: 1,
      title: 'Our first ride along together!👮',
      description: 'Mujhe abhi bhi yaad hai tum skyler ke sath ride along pe thik then vo thumhe mere paas chorke gya aur tum to mauka pe chauka maane aayi aur seedha aake beth gyi mere sath meri motu 🤭😂... and skyler to mast blessing bhi deke gya humara sath rehnke 11 logo ki team bnane ki 🤣 uske baadse aajtak sirf tumhare sath ride along mai hi maja aata hai 😍| tumhari stream pe mujhe abhi yaad hai 15th of November ki stream TimeStamp 03:28:50 pe 🥰',
      emoji: '👮',
      date: '15-11-2024',
    },
    {
      id: 2,
      title: 'Rainy Day Walk',
      description: 'We got soaked but it was so much fun! ☔',
      emoji: '☔',
      date: '2023-07-20',
    },
    {
      id: 3,
      title: 'First K-drama Together',
      description: 'We binge-watched our first K-drama and cried together! 🎬',
      emoji: '🎬',
      date: '2023-09-10',
    },
    {
      id: 4,
      title: 'First K-drama Together',
      description: 'We binge-watched our first K-drama and cried together! 🎬',
      emoji: '🎬',
      date: '2023-09-10',
    },
    {
      id: 5,
      title: 'First K-drama Together',
      description: 'We binge-watched our first K-drama and cried together! 🎬',
      emoji: '🎬',
      date: '2023-09-10',
    },
    {
      id: 6,
      title: 'First K-drama Together',
      description: 'We binge-watched our first K-drama and cried together! 🎬',
      emoji: '🎬',
      date: '2023-09-10',
    },
  ]);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [newMemory, setNewMemory] = useState({ title: '', description: '', emoji: '', date: '' });

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

  const handleAddMemory = () => {
    if (!newMemory.title || !newMemory.description || !newMemory.emoji || !newMemory.date) {
      alert('Please fill in all fields to add a memory! 💕');
      return;
    }
    const newId = memories.length + 1;
    setMemories([...memories, { id: newId, ...newMemory }]);
    setNewMemory({ title: '', description: '', emoji: '', date: '' });
  };

  return (
    <div className="container memories-page">
      <div className="glass-box">
        <h1>Our Memories 🍕</h1>
        <p>Some of our special moments together... 🥰</p>
        <p>More to come soon...🤭</p>
        <div className="memories-grid">
          {memories.map((memory) => (
            <div
              key={memory.id}
              className="memory-card"
              onClick={() => setSelectedMemory(memory)}
            >
              <div className="memory-emoji">{memory.emoji}</div>
              <h3>{memory.title}</h3>
              <p>{memory.date}</p>
            </div>
          ))}
        </div>
        <div className="add-memory">
          <h2>Add a New Memory ✍️</h2>
          <input
            type="text"
            placeholder="Title (e.g., Our Beach Day)"
            value={newMemory.title}
            onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newMemory.description}
            onChange={(e) => setNewMemory({ ...newMemory, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Emoji (e.g., 🏖️)"
            value={newMemory.emoji}
            onChange={(e) => setNewMemory({ ...newMemory, emoji: e.target.value })}
          />
          <input
            type="date"
            value={newMemory.date}
            onChange={(e) => setNewMemory({ ...newMemory, date: e.target.value })}
          />
          <button type="button" onClick={handleAddMemory}>Add Memory 💕</button>
        </div>
      </div>
      {selectedMemory && (
        <div className="memory-popup">
          <div className="popup-content">
            <h2>{selectedMemory.title}</h2>
            <p>{selectedMemory.date}</p>
            <p>{selectedMemory.description}</p>
            <div className="memory-emoji large">{selectedMemory.emoji}</div>
            <button type="button" onClick={() => setSelectedMemory(null)}>Close</button>
          </div>
        </div>
      )}
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
        <button type="button" onClick={() => window.history.back()} className="btn">Back ⬅️</button>
      </div>
    </div>
  );
}

export default Memories;