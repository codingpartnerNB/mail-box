import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RootLayout from './components/Layout/RootLayout';
import Signup from './components/Signup/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
