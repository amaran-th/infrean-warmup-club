import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import Chat from './pages/Chat';
import Note from './pages/Note';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/note" element={<Note />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
