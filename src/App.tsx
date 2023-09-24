import { useTonConnect } from "./hooks/useTonConnect";
import "@twa-dev/sdk";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoomPage from "./pages/RoomPage";
import { RoomProvider } from "./contexts/RoomContext";

import "./App.css";

function App() {
  const { network } = useTonConnect();

  return (
    <RoomProvider>
      <div className="app-wrapper">
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="room/:id" element={<RoomPage />} />
          </Routes>
        </Router>
      </div>
    </RoomProvider>
  );
}

export default App;
