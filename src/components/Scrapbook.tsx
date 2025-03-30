import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSharedEffects from '../hooks/useSharedEffects';
import '../css/shared.css';
import '../css/scrapbook.css';

function Scrapbook() {
  const { volume, setVolume, isMuted, setIsMuted, isPlaying, togglePlayPause } = useSharedEffects();
  const [pages, setPages] = useState<{ text: string; image?: string }[]>([
    { text: 'Our first date... 🌟', image: 'https://cdn.discordapp.com/attachments/1199988544219906098/1341123475343015987/image.png?ex=67e8ed51&is=67e79bd1&hm=a63b867c5fe9927d49b41c2f1b6c54ba9d2f955e7e83b3315589286ac6b0c398&' },
    { text: 'That cute selfie we took! 📸', image: 'https://cdn.discordapp.com/attachments/1199988544219906098/1341123475343015987/image.png?ex=67e8ed51&is=67e79bd1&hm=a63b867c5fe9927d49b41c2f1b6c54ba9d2f955e7e83b3315589286ac6b0c398&' },
    { text: 'Our late-night talks... 🌙', image: 'https://cdn.discordapp.com/attachments/1199988544219906098/1341123475343015987/image.png?ex=67e8ed51&is=67e79bd1&hm=a63b867c5fe9927d49b41c2f1b6c54ba9d2f955e7e83b3315589286ac6b0c398&' },
  ]);
  const [newText, setNewText] = useState<string>('');
  const [newImageUrl, setNewImageUrl] = useState<string>('');

  const sidePhotos = [
    { src: 'https://cdn.discordapp.com/attachments/1199988544219906098/1341123475343015987/image.png?ex=67e8ed51&is=67e79bd1&hm=a63b867c5fe9927d49b41c2f1b6c54ba9d2f955e7e83b3315589286ac6b0c398&', caption: 'Love ❤️' },
    { src: 'https://cdn.discordapp.com/attachments/1199988544219906098/1341123475343015987/image.png?ex=67e8ed51&is=67e79bd1&hm=a63b867c5fe9927d49b41c2f1b6c54ba9d2f955e7e83b3315589286ac6b0c398&', caption: 'You & Me 💕' },
    { src: 'https://cdn.discordapp.com/attachments/1199988544219906098/1341123475343015987/image.png?ex=67e8ed51&is=67e79bd1&hm=a63b867c5fe9927d49b41c2f1b6c54ba9d2f955e7e83b3315589286ac6b0c398&', caption: 'Forever 🌟' },
    { src: 'https://cdn.discordapp.com/attachments/1199988544219906098/1341123475343015987/image.png?ex=67e8ed51&is=67e79bd1&hm=a63b867c5fe9927d49b41c2f1b6c54ba9d2f955e7e83b3315589286ac6b0c398&', caption: 'Sweetie 🥰' },
    { src: 'https://cdn.discordapp.com/attachments/1199988544219906098/1341123475343015987/image.png?ex=67e8ed51&is=67e79bd1&hm=a63b867c5fe9927d49b41c2f1b6c54ba9d2f955e7e83b3315589286ac6b0c398&', caption: 'Heartbeats 💓' },
    { src: 'https://cdn.discordapp.com/attachments/1199988544219906098/1341123475343015987/image.png?ex=67e8ed51&is=67e79bd1&hm=a63b867c5fe9927d49b41c2f1b6c54ba9d2f955e7e83b3315589286ac6b0c398&', caption: 'Always 🌹' },
    { src: 'https://cdn.discordapp.com/attachments/1199988544219906098/1341123475343015987/image.png?ex=67e8ed51&is=67e79bd1&hm=a63b867c5fe9927d49b41c2f1b6c54ba9d2f955e7e83b3315589286ac6b0c398&', caption: 'Soulmate ✨' },
    { src: 'https://cdn.discordapp.com/attachments/1199988544219906098/1341123475343015987/image.png?ex=67e8ed51&is=67e79bd1&hm=a63b867c5fe9927d49b41c2f1b6c54ba9d2f955e7e83b3315589286ac6b0c398&', caption: 'Hugs 🤗' },
  ];

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const sendToDiscordWebhook = async (text: string, imageUrl?: string) => {
    const webhookUrl = 'https://discord.com/api/webhooks/1355626928987705364/3mV8pvo6xEhHwDT7SZFt3QRK-oLgyp-494Mrke_FDq8SlkSYFNi6ZrWgYqlfYpiXErPt';

    const embed = {
      title: 'New Scrapbook Memory Added 📖❤️',
      description: text,
      color: 0xFF6F91,
      timestamp: new Date().toISOString(),
      ...(imageUrl && {
        image: {
          url: imageUrl,
        },
      }),
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [embed],
        }),
      });

      if (!response.ok) {
        console.error('Failed to send to Discord webhook:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending to Discord webhook:', error);
    }
  };

  const handleAddPage = () => {
    if (newText.trim() === '' && !newImageUrl) return;

    sendToDiscordWebhook(newText, newImageUrl || undefined);
    setPages([...pages, { text: newText, image: newImageUrl }]);
    setNewText('');
    setNewImageUrl('');
  };

  return (
    <div className="container">
      <div className="side-photos left-photos">
        {[...sidePhotos, ...sidePhotos].map((photo, index) => (
          <div key={index} className="polaroid-frame">
            <img src={photo.src} alt={`Side ${index + 1}`} />
            <p className="polaroid-caption">{photo.caption}</p>
          </div>
        ))}
      </div>

      <div className="glass-box">
        <h1>Our Scrapbook 📖❤️</h1>
        <p>Capturing our love story...</p>
        <div className="scrapbook-container">
          {pages.map((page, index) => (
            <div
              key={index}
              className="page"
              style={{ transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})` }}
            >
              {page.image && (
                <div className="polaroid-frame">
                  <img src={page.image} alt={`Memory ${index + 1}`} />
                </div>
              )}
              <p>{page.text}</p>
            </div>
          ))}
        </div>
        <div className="add-page">
          <input
            type="text"
            placeholder="Add a memory... 💌"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="memory-input"
          />
          <input
            type="text"
            placeholder="Paste image URL (Discord/Imgur) 🌐"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            className="memory-input"
          />
          <button type="button" onClick={handleAddPage} className="add-btn">
            Add to Scrapbook 🌸
          </button>
        </div>
      </div>

      <div className="side-photos right-photos">
        {[...sidePhotos, ...sidePhotos].map((photo, index) => (
          <div key={index} className="polaroid-frame">
            <img src={photo.src} alt={`Side ${index + 1}`} />
            <p className="polaroid-caption">{photo.caption}</p>
          </div>
        ))}
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

export default Scrapbook;