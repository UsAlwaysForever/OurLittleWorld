import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSharedEffects from '../hooks/useSharedEffects';
import '../css/shared.css';
import '../css/lovenotes.css';

function LoveNotes() {
  const { volume, setVolume, isMuted, setIsMuted, isPlaying, togglePlayPause } = useSharedEffects();
  const [note, setNote] = useState<string>('');
  const [customText, setCustomText] = useState<string>('');
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState<boolean>(false);
  const [isLetterOut, setIsLetterOut] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const loveNotes: string[] = [
    'You + Me = Cutest Story Ever! ❤️',
  ];

  const sendToDiscordWebhook = async (noteText: string) => {
    const webhookUrl = 'https://discord.com/api/webhooks/1355626928987705364/3mV8pvo6xEhHwDT7SZFt3QRK-oLgyp-494Mrke_FDq8SlkSYFNi6ZrWgYqlfYpiXErPt';

    const embed = {
      title: 'New Love Note 💌',
      description: noteText,
      color: 0xFF6F91,
      timestamp: new Date().toISOString(),
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

  const showLoveNote = (): void => {
    const randomNote = loveNotes[Math.floor(Math.random() * loveNotes.length)];
    const finalNote = customText ? `${customText} ${randomNote}` : randomNote;
    setNote(finalNote);
    sendToDiscordWebhook(finalNote);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const openEnvelope = () => {
    setIsEnvelopeOpen(true);
    setTimeout(() => {
      setIsLetterOut(true);
    }, 2000);
  };

  return (
    <div className="container">
      {!isLetterOut ? (
        <div
          className="envelope-wrapper"
          onClick={openEnvelope}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`envelope ${isEnvelopeOpen ? 'open' : ''} ${isHovered ? 'hovered' : ''}`}>
            <div className="envelope-front">
              <div className="envelope-text">
                To My Dearest Riya 💕
                <div className="small-hearts">💖💖💖</div>
              </div>
            </div>
            <div className="envelope-back">
              <div className="heart-seal">❤️</div>
            </div>
            <div className="envelope-flap-top"></div>
            <div className="envelope-flap-bottom"></div>
            <div className="envelope-flap-left"></div>
            <div className="envelope-flap-right"></div>
            <div className="letter"></div>
          </div>
        </div>
      ) : (
        <div className="glass-box fade-in">
          <h1>Dear Riya 💕</h1>
          <p>Meri pyaari Motu,</p>
          <p>
            Pata nahi kaha se likhna shuru kaise karun, kyunki jitna bhi likh loon, lagta hai sab kuch kam hai. Par ek baat jo dil se kehna chahta hoon tum meri zindagi ka sabse best part ho. Jab tum mujhe Chotu bulati ho bby bulati ho ya kabhi Hubby kehke pyaar jatati ho, tab ek second ke liye sab kuch ruk jata hai. Tumhe yaad hai jab hum pehli baar mile the? Showtown mai. phir tumne meri shirt kheechi thi, aur phir aaj seedha shirt khichne se seedha shirt ke ander hi ghus gyi ho 🤭🥰. Us din jo humare bich shuru huya tha, aaj wo meri poori duniya ban chuki hai. Tumhari hasi, tumhara kaatna, woh teasing aur shaitaniyan, humara ek dusre ko khana sab kuch ek addiction ban gaya hai. Tum jab mujhe chidati ho, mana karti ho kisi cheez ke liye, ya jab sirf apni duniya me mujhe rakhti ho tabse confrim ho gya hai ki haan, yeh ladki sirf meri hai. Tum sirf ek pyaar bhara ehsaas nahi ho, tum mera sukoon ho, meri duniya ho, meri lifeline ho.  Mujhe pata hai, tumne bohot kuch saha hai abhi tak, bohot kuch face kiya hai. Log kya sochte hain, kaise behave karte hain, chahe koi acha ho ya bura tum sabke baare me sochti ho. Tumhari yahi baat mujhe sabse zyada pasand hai. Tum ek fighter ho meri sherni ha billi wali harkate hai but sherni ho meri tum, jo duniya se lad sakti hai aur apne sapne poore kar sakti hai. I am so proud of you, Motu 💕. Aur mai yeh promise karta hoon mai hamesha tumhare saath rahunga. Aakhri dum tak, chahe jo bhi ho, chahe jitni bhi problems aaye. Tum kabhi akeli nahi rahogi. Har cheez sath mai face karenge, sath jeeyenge, sath ladenge aur sath jeetenge. Tumhari YouTube journey ho ya meri Army dream, dono ka ek dusre se alag hona mumkin nahi. Tum meri success ho, tum meri jeet ho.Tumhare bina yeh duniya adhoori lagegi. Motu, I love you so muchhhh. Sirf bolne ke liye nahi, balki har ek heartbeat ke saath. Tum meri ho, aur mai sirf tumhara. Yeh baat kabhi mat bhoolna.
          </p>
          <p>💕 Tumhara Chotu sa Hubby 💕</p>
          <p>❤️ Aman ❤️</p>
          <div id="lovenotes">
            <input
              type="text"
              placeholder="Add your own twist!"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
            />
            <button type="button" onClick={showLoveNote}>Get a Note</button>
            {note && <div id="love-note">{note}</div>}
          </div>
        </div>
      )}
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

export default LoveNotes;