import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main';
import SinglePage from './components/SinglePage/SinglePage';
import Favorites from './components/Favorites/Favorites';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/:id" element={<SinglePage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
