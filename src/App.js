import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import Pages from "./components/Routes/Pages";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <Pages isLoggedIn={isLoggedIn} />
    </BrowserRouter>
  );
}

export default App;
