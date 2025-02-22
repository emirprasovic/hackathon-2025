import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from "./components/landing/LandingPage";
import Chat from "./components/chat/Chat";
import Header from "./components/header/Header";
import DonatePage from './components/donate-page/DonatePage';
import './App.css'

function App() {
  return (
    <Router>
      <Chat />
      <Header />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/donate" element={<DonatePage />} />
      </Routes>
    </Router>
  )
}

export default App
