import { useEffect, useState, useRef } from 'react';

const useSharedEffects = () => {
  const [volume, setVolume] = useState<number>(0.1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true); // Default playing
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Music setup
  useEffect(() => {
    const songUrl = '/song.mp3'; // Local song in public folder
    const audio = new Audio(songUrl);
    audio.loop = true;
    audio.volume = volume;
    audio.play().catch(() => {
      console.log('Autoplay prevented');
      setIsPlaying(false); // Agar autoplay block ho, to paused state
    });
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

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