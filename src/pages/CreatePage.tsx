import { useContext, useState } from "react";

import "./CreatePage.css";
import { useTonConnect } from "../hooks/useTonConnect";
import { TonConnectButton } from "@tonconnect/ui-react";
import { ServerURL } from "../constants";
import { AdminContext } from "../contexts/AdminContext";
import { Schema } from "../types";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");
  const { wallet } = useTonConnect();

  const { setAdminRoom } = useContext(AdminContext);

  const navigate = useNavigate();

  function createRoom() {
    fetch(`${ServerURL}/room`, {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: roomName,
        password: password,
        admin_wallet: wallet,
      }),
    })
      .then((res) => res.json())
      .then((res: Schema) => {
        setAdminRoom({
          roomName: res.room.name,
          roomPassword: res.room.password,
          roomAdmin: res.room.admin_wallet,
        });

        navigate(`/room/${res.room.id}`);
      });
  }

  function handleSubmit() {
    if (!(roomName.length > 0 && password.length === 6)) {
      return;
    }

    createRoom();
  }

  function handleRoomNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRoomName(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.match(/^[0-9]{0,6}$/) && e.target.value.length <= 6) {
      setPassword(e.target.value);
    }
  }

  return (
    <div className="create-page-wrapper">
      <TonConnectButton />
      <a className="create-page-title">Create New Room</a>
      <input
        value={roomName}
        type="text"
        placeholder="Enter room name"
        onChange={handleRoomNameChange}
      />
      <input
        value={password}
        type="password"
        placeholder="Enter password"
        onChange={handlePasswordChange}
      />
      <button type="submit" onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
}
