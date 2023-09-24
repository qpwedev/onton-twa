import { useTonConnect } from "./hooks/useTonConnect";
import "@twa-dev/sdk";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoomPage from "./pages/RoomPage";
import { RoomProvider } from "./contexts/RoomContext";

import "./App.css";
import CreatePage from "./pages/CreatePage";
import { AdminProvider } from "./contexts/AdminContext";

function App() {
  const { network } = useTonConnect();

  return (
    <AdminProvider>
      <RoomProvider>
        <div className="app-wrapper">
          <Router>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="create" element={<CreatePage />} />
              <Route path="room/:id" element={<RoomPage />} />
            </Routes>
          </Router>
        </div>
      </RoomProvider>
    </AdminProvider>
  );
}

export default App;
