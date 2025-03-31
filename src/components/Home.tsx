import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useSharedEffects from '../hooks/useSharedEffects';
import '../css/shared.css';

function Home() {
  const { volume, setVolume, isMuted, setIsMuted, isPlaying, togglePlayPause } = useSharedEffects('/songs/DilDiyanGallan.mp3');
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <div className="container home">
      <div className="glass-box">
        <div className="content-wrapper">
          <h1>Hey Riya! ❤️</h1>
          <video 
            ref={videoRef}
            className="home-video"
            controls
            loop
            playsInline
          >
            <source src="/videos/Home.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p>Meri Pyari Motu! 💕</p>
          <p>This is a little surprise from my side</p>
          <p>Our tiny, cute world ~ miles apart but super close!</p>
          <div className="hearts" />
          <div className="buttons">
            <Link to="/memories" className="btn">Our Memories 💖</Link>
            <Link to="/lovenotes" className="btn">Love Notes ✍️</Link>
            <Link to="/countdown" className="btn">Countdown ⏳</Link>
            <Link to="/quiz" className="btn">Quiz 🌟</Link>
            <Link to="/secret" className="btn">Some Secrets 🔒</Link>
            <Link to="/scrapbook" className="btn">Scrapbook 📖</Link>
            <Link to="/map" className="btn">Map 🌍</Link>
            <Link to="/foodie" className="btn">Foodie 🍰</Link>
            <Link to="/kdrama" className="btn">K-drama 🎬</Link>
          </div>
          <div className="end-button-container">
            <Link to="/proposal" className="btn end-btn">Open This in the End</Link>
          </div>
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

export default Home;