import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from "./components/LandingPage";
import Chat from "./components/chat/Chat";
import './App.css'

function App() {
  return (
    <Router>
      <Chat />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  )
}

export default App
