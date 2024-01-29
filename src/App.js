import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import RootLayout from './components/Layout/RootLayout';
import Signup from './components/Signup/Signup';
import Home from './components/Layout/Home';
import ForgotPassword from './components/Layout/ForgotPassword';
import { useSelector } from 'react-redux';
import ComposeMail from './components/Mails/ComposeMail';
import Inbox from './components/Mails/Inbox';
import InboxMsg from './components/Mails/InboxMsg';
import Sent from './components/Mails/Sent';
import SentMsg from './components/Mails/SentMsg';

function App() {
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<Signup />} />
          <Route path="home" element={isLoggedIn ? <Home /> : <Navigate to='/' />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="compose" element={isLoggedIn ? <ComposeMail /> : <Navigate to='/' />} />
          <Route path="inbox" element={isLoggedIn ? <Inbox /> : <Navigate to='/' />} />
          <Route path="inbox/:msgId" element={isLoggedIn ? <InboxMsg /> : <Navigate to='/' />} />
          <Route path="sent" element={isLoggedIn ? <Sent /> : <Navigate to='/' />} />
          <Route path="sent/:msgId" element={isLoggedIn ? <SentMsg /> : <Navigate to='/' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
