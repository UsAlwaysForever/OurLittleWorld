import { useEffect, useState, useRef } from 'react';

const useSharedEffects = (songUrl: string) => { // Song URL parameter add kiya
  const [volume, setVolume] = useState<number>(0.2);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Music setup
  useEffect(() => {
    const audio = new Audio(songUrl); // Dynamic song URL use karo
    audio.loop = true;
    audio.volume = volume;
    audio.play().catch(() => {
      console.log('Autoplay prevented');
      setIsPlaying(false);
    });
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, [songUrl]); // songUrl change hone pe audio reset ho

  // Volume and mute control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Play/pause control
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => console.log('Play failed'));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Click heart animation
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const heart = document.createElement('div');
      heart.className = 'click-heart';
      heart.innerHTML = '💖';
      heart.style.left = `${e.clientX}px`;
      heart.style.top = `${e.clientY}px`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1500);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return { volume, setVolume, isMuted, setIsMuted, isPlaying, togglePlayPause };
};

export default useSharedEffects;