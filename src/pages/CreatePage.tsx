import { useContext, useEffect, useState } from "react";

import "./CreatePage.css";
import { useTonConnect } from "../hooks/useTonConnect";
import { TonConnectButton } from "@tonconnect/ui-react";
import { ServerURL } from "../constants";
import { AdminContext } from "../contexts/AdminContext";
import { Schema } from "../types";
import { useNavigate } from "react-router-dom";
import { RoomContext } from "../contexts/RoomContext";

export default function CreatePage() {
  const [roomName, setRoomName] = useState("");
  const { wallet } = useTonConnect();

  const { setAdminRoom } = useContext(AdminContext);
  const { setRoom } = useContext(RoomContext);

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

        setRoom(res.room);

        navigate(`/room/${res.room.id}`);
      });
  }

  function handleSubmit() {
    if (!(roomName.length > 0)) {
      return;
    }

    createRoom();
  }

  function handleRoomNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRoomName(e.target.value);
  }

  useEffect(() => {
    function configureTelegram() {
      if (window.Telegram === undefined) {
        return;
      }

      window.Telegram.WebApp.BackButton.onClick(() => {
        navigate("/");
      });

      window.Telegram.WebApp.BackButton.show();
    }

    function cleanUpTelegram() {
      if (window.Telegram === undefined) {
        return;
      }

      window.Telegram.WebApp.BackButton.hide();
    }

    configureTelegram();

    return cleanUpTelegram;
  }, []);

  return (
    <div className="create-page-wrapper">
      <TonConnectButton />

      <div className="create-page-wrapper-data">
        <a className="enter-code-title">Create Room</a>

        <div className="input-page-name-wrapper">
          <input
            value={roomName}
            type="text"
            placeholder="My Pretty Room Name"
            onChange={handleRoomNameChange}
            className="create-page-name-input"
          />
        </div>

        <button type="submit" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
}
