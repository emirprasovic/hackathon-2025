import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Chat from "./components/Chat";
import Header from "./components/Header";
import DonatePage from "./pages/DonatePage";
import "./App.css";
import LeaderboardPage from "./pages/LeaderboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MerchPage from "./pages/MerchPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";


function App() {
  return (
    <Router>
      <Chat />
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/merch" element={<MerchPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

