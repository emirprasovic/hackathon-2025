import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import Chat from "./components/chat/Chat";
import Header from "./components/header/Header";
import DonatePage from "./pages/donate/DonatePage";
import "./App.css";
import LeaderboardPage from "./pages/leaderboards/LeaderboardPage";

function App() {
  return (
    <Router>
      <Chat />
      <Header />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
