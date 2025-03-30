import { useEffect, useState, useRef } from 'react';

const useSharedEffects = () => {
  const [volume, setVolume] = useState<number>(0.2);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Music setup
  useEffect(() => {
    const audio = new Audio('');
    audio.loop = true;
    audio.volume = volume;
    audio.play().catch(() => console.log('Autoplay prevented'));
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

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

  return { volume, setVolume, isMuted, setIsMuted };
};

export default useSharedEffects; 