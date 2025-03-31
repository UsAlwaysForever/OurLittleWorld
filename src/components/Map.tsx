import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSharedEffects from '../hooks/useSharedEffects';
import '../css/shared.css';
import '../css/map.css';

interface JourneyStep {
  name: string;
  x: number;
  y: number;
  icon: string;
  message: string;
}

function Map() {
  const { volume, setVolume, isMuted, setIsMuted, isPlaying, togglePlayPause } = useSharedEffects('/songs/Galliyan.mp3');
  const [journey] = useState<JourneyStep[]>([
    { name: 'Showtown Server 🎮', x: 50, y: 50, icon: '🎮', message: 'Yahan hum pehli baar mile! shirt khichte huye and ride along pe 🤭' },
    { name: 'Discord Chat 💬', x: 200, y: 150, icon: '💬', message: 'Late night baatein yahan shuru hui!' },
    { name: 'Insta Main Account 📸', x: 350, y: 250, icon: '📸', message: 'Tumhari pics ne dil chura liya!' },
    { name: 'Insta Private Account 🔒', x: 200, y: 400, icon: '🔒', message: 'Yahan hum closer aaye!' },
    { name: 'My Heart ❤️', x: 400, y: 500, icon: '❤️', message: 'Tumne yahan aakr ghar basa liya!' },
  ]);

  const [selectedPin, setSelectedPin] = useState<JourneyStep | null>(null);
  const [customMessage, setCustomMessage] = useState<string>('');
  const [animationStep, setAnimationStep] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const completedCurves: { startX: number; startY: number; endX: number; endY: number; cpX: number; cpY: number }[] = [];

  // Animation for curved connecting lines with single smooth curve
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initial draw of pins and completed curves
    const drawState = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw completed curves
      completedCurves.forEach((curve) => {
        ctx.beginPath();
        ctx.moveTo(curve.startX, curve.startY);
        ctx.quadraticCurveTo(curve.cpX, curve.cpY, curve.endX, curve.endY);
        ctx.strokeStyle = '#ff6f91';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
      // Draw pins
      journey.forEach((step) => {
        ctx.beginPath();
        ctx.arc(step.x, step.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#ff6f91';
        ctx.fill();
      });
    };
    drawState();

    // Animate only if not already completed
    if (!isAnimating) return;

    let step = 0;
    const animate = () => {
      if (step >= journey.length - 1) {
        setIsAnimating(false);
        return;
      }

      const start = journey[step];
      const end = journey[step + 1];
      let progress = 0;
      const cpX = (start.x + end.x) / 2;
      const cpY = start.y + (end.y - start.y) / 2 + (Math.random() - 0.5) * 50;

      const drawCurve = () => {
        if (!isAnimating || progress > 100) {
          // Save completed curve
          completedCurves.push({ startX: start.x, startY: start.y, endX: end.x, endY: end.y, cpX, cpY });
          if (step < journey.length - 2) {
            step++;
            setAnimationStep(step + 1);
            setTimeout(() => animate(), 1000); // 1-second delay between segments
          } else {
            setAnimationStep(journey.length - 1);
            setIsAnimating(false);
            // Heart animation
            const heart = journey[journey.length - 1];
            let scale = 1;
            const pulse = () => {
              drawState(); // Redraw everything
              ctx.beginPath();
              ctx.arc(heart.x, heart.y, 10 * scale, 0, 2 * Math.PI);
              ctx.fillStyle = 'rgba(255, 111, 145, 0.5)';
              ctx.fill();
              scale = scale === 1 ? 1.2 : 1;
              if (!isAnimating) setTimeout(() => requestAnimationFrame(pulse), 300);
            };
            pulse();
          }
          drawState();
          return;
        }

        drawState(); // Redraw completed curves and pins
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        const t = progress / 100;
        const x = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * cpX + t * t * end.x;
        const y = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * cpY + t * t * end.y;
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#ff6f91';
        ctx.lineWidth = 2;
        ctx.stroke();

        progress += 0.5; // Slow animation
        requestAnimationFrame(drawCurve);
      };
      drawCurve();
    };
    animate();

    // Cleanup to prevent blank page
    return () => {
      setIsAnimating(false);
      drawState(); // Ensure pins remain visible
    };
  }, [journey]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handlePinClick = (step: JourneyStep) => {
    setSelectedPin(step);
    setCustomMessage(step.message);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomMessage(e.target.value);
    if (selectedPin) {
      const updatedJourney = journey.map((s) =>
        s.name === selectedPin.name ? { ...s, message: e.target.value } : s
      );
      console.log(updatedJourney);
    }
  };

  const handleClosePin = () => {
    setSelectedPin(null);
    setCustomMessage('');
  };

  return (
    <div className="container">
      <div className="glass-box">
        <h1>Our Virtual Journey 🌍❤️</h1>
        <p>From GTA RP to my heart, our online love story!</p>

        {/* Virtual Map */}
        <div className="virtual-map">
          <canvas ref={canvasRef} width={450} height={550} className="path-canvas" />
          {journey.map((step, index) => (
            <div
              key={index}
              className="virtual-pin"
              style={{ left: `${step.x}px`, top: `${step.y}px` }}
              onClick={() => handlePinClick(step)}
            >
              <span className={`pin ${index === journey.length - 1 && animationStep === journey.length - 1 ? 'heart-pulse' : ''}`}>
                {step.icon}
              </span>
            </div>
          ))}
          {selectedPin && (
            <div className="pin-note">
              <p>{selectedPin.name}</p>
              <textarea
                value={customMessage}
                onChange={handleMessageChange}
                placeholder="Write our moment here..."
                rows={3}
                maxLength={100}
              />
              <button type="button" onClick={handleClosePin} className="close-btn">Close</button>
              <div className="heart-pop">💖</div>
            </div>
          )}
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

export default Map;