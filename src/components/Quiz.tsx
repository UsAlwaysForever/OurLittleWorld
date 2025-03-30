import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSharedEffects from '../hooks/useSharedEffects';
import '../css/shared.css';
import '../css/quiz.css';

function Quiz() {
  const { volume, setVolume, isMuted, setIsMuted, isPlaying, togglePlayPause } = useSharedEffects();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answer, setAnswer] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const questions = [
    { question: 'Which name I call you with most', answer: 'motu' },
    { question: 'You are my what?', answer: 'life' },
    { question: 'Where did we first meet?', answer: 'shirt khichte huye pd cells mai' },
    { question: 'What I like the most? Obviously after you!', answer: 'army' },
    { question: 'Which thing I like the most in you?', answer: 'everything' },
    { question: 'What I love to eat the most ', answer: 'me' },
    { question: '', answer: 'pepperoni' },
    { question: '', answer: 'crash landing on you' },
    { question: '', answer: 'cafe' },
  ];

  const handleStart = () => {
    setShowIntro(false);
  };

  const handleSubmit = () => {
    if (answer.toLowerCase() === questions[currentQuestion].answer) {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswer('');
        setResult('Correct! Next question... 🎉');
      } else {
        setResult('');
        setQuizCompleted(true);
      }
    } else {
      setResult('Oops! Try again... 😜');
    }
  };

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
      {showIntro ? (
        <div className="intro-container">
          <video id="intro-video" controls autoPlay>
            <source src="/path/to/your/intro-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button type="button" className="start-btn" onClick={handleStart}>
            Start Quiz 🌸
          </button>
        </div>
      ) : quizCompleted ? (
        <div className="congrats-container">
          <h1 id="congrats">Congratulations! 🎉💖</h1>
          <video id="final-video" controls autoPlay>
            <source src="/path/to/your/final-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="nav-buttons">
            <Link to="/home" className="btn">Home 🏠</Link>
          </div>
        </div>
      ) : (
        <>
          <div className="glass-box">
            <h1>Quiz Time! 🌟</h1>
            <p>Let’s see how well you know me!</p>
            <div id="question">{questions[currentQuestion].question}</div>
            <input
              id="answer"
              type="text"
              placeholder="Your answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button type="button" onClick={handleSubmit}>Submit</button>
            {result && <div id="result">{result}</div>}
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
        </>
      )}
    </div>
  );
}

export default Quiz;