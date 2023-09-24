import { memo, useContext, useEffect, useState } from "react";
import { useTonConnect } from "../hooks/useTonConnect";
import { RoomContext } from "../contexts/RoomContext";
import { Member as MemberType, MembersListProps, Room } from "../types";
import { randomEmoji } from "../utils";
import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { HighLoadAddress, ServerURL } from "../constants";

import "./RoomPage.css";
import { useNavigate } from "react-router-dom";

const defaultTx = {
  validUntil: Math.floor(Date.now() / 1000) + 600, // unix epoch seconds
  messages: [
    {
      address: HighLoadAddress,
      amount: 0,
    },
  ],
};

export default function RoomPage() {
  const { room, setRoom } = useContext(RoomContext);
  if (room.Members === null || room.Members === undefined) {
    room.Members = [];
    setRoom(room);
  }

  const navigate = useNavigate();

  const { wallet } = useTonConnect();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${ServerURL}/room/${room.id}`, {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          console.error("Network response was not ok", response);
          return;
        }
        const result = await response.json();
        setRoom(result.room);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    const intervalId = setInterval(fetchData, 5000);

    fetchData();

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

      window.Telegram.WebApp.BackButton.offClick(() => {
        navigate("/");
      });
      window.Telegram.WebApp.BackButton.hide();
    }

    configureTelegram();

    return () => {
      clearInterval(intervalId);
      cleanUpTelegram();
    };
  }, []);

  return (
    <div className="room-page-wrapper">
      <div className="tonconnect-btn">
        <TonConnectButton />
      </div>
      <div className="room-page-name-wrapper">
        <div className="room-page-name">{room?.name}</div>

        <div className="room-members-amount">
          <div>Password: {room?.password}</div>
          <div>Members: {room.Members.length}</div>
        </div>
      </div>
      {room?.admin_wallet === wallet && <AdminControls room={room} />}

      <MembersList members={room.Members} />
    </div>
  );
}

function AdminControls({ room }: { room: Room }) {
  const [tx, setTx] = useState(defaultTx);
  const [tonConnectUi] = useTonConnectUI();
  const [amount, setAmount] = useState(0);
  let splittedValue = room.Members.length * (amount >= 0 ? amount : 0);

  function sendDistributeRequest(value: number) {
    fetch(`${ServerURL}/distribution`, {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId: room.id,
        amount: value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleClick() {
    tonConnectUi
      .sendTransaction(tx)
      .then((res) => {
        setTimeout(
          () => sendDistributeRequest(tx.messages[0].amount / 1e9),
          10000
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > 6) {
      return;
    }

    const newAmount = Number.parseFloat(e.target.value);
    splittedValue = room.Members.length * (newAmount >= 0 ? newAmount : 0);
    setAmount(newAmount);
    const newTx = { ...tx };
    newTx.messages[0].amount = splittedValue * 1e9;
    setTx(newTx);
  }

  return (
    <div className="room-page-admin-controls">
      <input
        className="room-page-admin-controls-amount-input"
        type="tel"
        value={amount}
        placeholder="TON per Member"
        onChange={handleAmountChange}
      />

      <div className="room-page-admin-controls-split-sum">
        Total: {splittedValue} TON
      </div>
      {/* <button onClick={handleClick}>Send transaction</button> */}
    </div>
  );
}

const MembersList: React.FC<MembersListProps> = memo(
  ({ members }) => {
    return (
      <div className="members-list">
        {members !== null && members.length !== 0 ? (
          members.map((member) => <Member key={member.id} member={member} />)
        ) : (
          <div className="room-page-no-members">No Members</div>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.members === nextProps.members
);

function Member({ member }: { member: MemberType }) {
  return (
    <div className="room-page-member">
      <div className="room-page-member-emoji">{randomEmoji(member.id)}</div>
      <a
        target="_blank"
        href={`https://tonscan.org/address/${member.address}`}
        className="room-page-member-address"
      >
        {trimString(member.address, 10)}
      </a>
    </div>
  );
}

function trimString(str: string, size: number) {
  if (!str) return str;
  if (str.length <= size) return str;

  const halfSize = Math.floor(size / 2);
  const firstPart = str.substr(0, halfSize);
  const lastPart = str.substr(-halfSize);

  return `${firstPart}...${lastPart}`;
}
