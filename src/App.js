import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import RootLayout from './components/Layout/RootLayout';
import Signup from './components/Signup/Signup';
import Home from './components/Layout/Home';
import ForgotPassword from './components/Layout/ForgotPassword';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<Signup />} />
          <Route path="home" element={isLoggedIn ? <Home /> : <Navigate to='/' />} />
          <Route path="forgot" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
