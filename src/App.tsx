import "./App.css";
import { useTonConnect } from "./hooks/useTonConnect";
import "@twa-dev/sdk";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const { network } = useTonConnect();

  return (
    <div className="app-wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="about" element={<></>} />
          {/* create route  */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
