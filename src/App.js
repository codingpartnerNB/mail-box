import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RootLayout from './components/Layout/RootLayout';
import Signup from './components/Signup/Signup';
import Home from './components/Layout/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<Signup />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
