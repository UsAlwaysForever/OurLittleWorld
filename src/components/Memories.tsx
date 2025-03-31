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
  const { volume, setVolume, isMuted, setIsMuted, isPlaying, togglePlayPause } = useSharedEffects('/songs/TumSeHi.mp3');
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
      title: 'First Message on discord 💬',
      description: 'Jab first time tumne discord message kiya 17 November 2024 ko raat ke 2:25 ko tabh to laga tha ki kya baat kru kese karu boht saari butterfly aayi but phir dheere dheere normal se special hoti gyi chats ha phir ek tumhare papa ne call kara tabh thoda dar gya tha but phir tumhare message aate normal ho gya tha mai vo moment boht yaad aate hai phir baad baate aur hote hi rhi aur ab to chahta hu baate kabhi khatam hi na ho I love you ❤️ ',
      emoji: '🎮',
      date: '2024-11-17',
    },
    {
      id: 3,
      title: 'Insta pe Secret Approach 🫢',
      description: 'Vese to insta pe main id pe mai baat karta tha but ek din tumhare papa ka call aaya to kam ho gyi thi baate yaad aati thi but tumhare liye dar bhi lagta tha ki koi problem na ho phir ek din tumne dusri id message kiya pehle to mujhe lga ki koi masti kar rha hai discord ka hi dost but jab confirm huya to boht special feel huya ki main tumhare inta close aa gya phir to har chats har video calls pe tumse baat karke sukoon milta hai aaj bhi neend nhi aati agar baat nhi ho thodi si bhi din I love you motuuu ❤️',
      emoji: '🗨️',
      date: '2024-12-05',
    },
    {
      id: 4,
      title: 'First Time irl meeting 💫🥰',
      description: 'jab se tum hospital mai admit huyi to boht dar lag rha tha boht tension ho rhi phir uper se hafte bhar tak koi message nhi aaya tha mujhe mai boht dar gya tha boht tension and stress mai tha boht miss kar rha tha but mujhe trust and faith tha tumpe ki tum jaldi msg karogi phir jab mai shaadi attend krke laut rha tha to tumhara call aaya but mai utha nhi paya tha mom dad sath the phir jab baadme call kiya to  mummy ne uthaya to vo boli ICU wagera boli to mai boht dar gya tha but phir baadme tumhare call aane ke baad rahat mili phir jab mai milne aaya to boht dar lga kya kahuga kya karunga thoda problem bhi aayi dost ki wajah se late huya but thik time pe pohuch gya tha jab tumse mila to boht acha feel huya tumhara sath thodi si hi sahi but hospital ki walks boht badiya lgi tum mujhe kese taad rhi thi lift mai jo mukke maare se boht jor se lge the XD but ha pyaare bhi the us din aesa lag rha tha naa jau wapis wahi rahu but jana pada aur tumne bhi bola tha taki late na ho warna wahi bas jata mai to boht aacha tha yrr vo moment I love it and I love youu... ',
      emoji: '🥰',
      date: '----',
    },
    {
      id: 5,
      title: "Proposal 🥰",
      description: 'Ye din kese bhul sakta hu hum pyaar se chatting kar rhe hospital mai tum taad rhi uske baare mai discuss kar rhi the phir tumne mujhe apna banda claim kar liya tha us din to mujhe boht butterfly feel huya boht special feel huya phir thodi chatting ke baad mene ek special message likha meri special motu ke liye utna ache se nhi likh paya tha but ha jo likh tha dil se likha and jese hi tumne ha to bola to mai to pagal sa ho gya tha ghar mai uchal khud rha tha boxing kar rha tha full energy spike aa rhe the inta acha to aaj tak nhi lga aesa lga chilla ke sabko bol du but ghar wale tod dete XD but ha tabse decide ho gya hai ki tum hi ho meri first and last girlfriend and forever life partner I will always stay with u and will love u a lot boht sara till inifity I love you Riya ❤️',
      emoji: '❤️',
      date: '2025-03-03',
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
    const video = document.querySelector('.memories-video') as HTMLVideoElement;
    if (video) {
      video.volume = newVolume;
      video.muted = false;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    const video = document.querySelector('.memories-video') as HTMLVideoElement;
    if (video) {
      video.muted = !isMuted;
    }
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
        <video 
          className="memories-video"
          controls
          loop 
          volume={isMuted ? 0 : volume}
          muted={isMuted}
          playsInline
        >
          <source src="/videos/Memories.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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