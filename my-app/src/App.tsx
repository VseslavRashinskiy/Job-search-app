import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import SinglePage from './components/SinglePage';
import fetchJobVacancies from './components/Response';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<SinglePage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
