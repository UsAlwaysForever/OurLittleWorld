import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EntryGame from './components/EntryGame';
import QuizGate from './components/QuizGate';
import Home from './components/Home';
import Memories from './components/Memories';
import LoveNotes from './components/LoveNotes';
import Countdown from './components/Countdown';
import Quiz from './components/Quiz';
import Secret from './components/Secret';
import Scrapbook from './components/Scrapbook';
import Map from './components/Map';
import Foodie from './components/Foodie';
import Kdrama from './components/Kdrama';
import Proposal from './components/Proposal';
import LockedUp from './components/LockedUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EntryGame />} />
        <Route path="/quiz-gate" element={<QuizGate />} />
        <Route path="/home" element={<Home />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/lovenotes" element={<LoveNotes />} />
        <Route path="/countdown" element={<Countdown />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/secret" element={<Secret />} />
        <Route path="/scrapbook" element={<Scrapbook />} />
        <Route path="/map" element={<Map />} />
        <Route path="/foodie" element={<Foodie />} />
        <Route path="/kdrama" element={<Kdrama />} />
        <Route path="/proposal" element={<Proposal />} />
        <Route path="/locked-up" element={<LockedUp />} /> 
        <Route path="*" element={<div><h1>404 - Page Not Found</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;