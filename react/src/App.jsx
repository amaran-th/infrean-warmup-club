import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import Budget from './pages/Budget';
import Note from './pages/Note';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/note" element={<Note />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
