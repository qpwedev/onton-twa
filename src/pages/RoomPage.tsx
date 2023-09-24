import { useContext, useState } from "react";
import { useTonConnect } from "../hooks/useTonConnect";
import { RoomContext } from "../contexts/RoomContext";
import { Member as MemberType, Room } from "../types";
import { randomEmoji } from "../utils";
import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { HighLoadAddress } from "../constants";

import "./RoomPage.css";

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
  const { room } = useContext(RoomContext);

  const { wallet } = useTonConnect();

  return (
    <div className="room-page-wrapper">
      <div className="tonconnect-btn">
        <TonConnectButton />
      </div>
      <div className="room-page-name-wrapper">
        <div className="room-page-name">{room?.name}</div>
        <div className="room-members-amount">{room.Members.length} members</div>
      </div>
      {room?.admin_wallet !== wallet && <AdminControls room={room} />}

      <MembersList members={room.Members} />
    </div>
  );
}

function AdminControls({ room }: { room: Room }) {
  const [tx, setTx] = useState(defaultTx);
  const [tonConnectUi] = useTonConnectUI();
  const [amount, setAmount] = useState(0);
  let splittedValue = room.Members.length * (amount >= 0 ? amount : 0);

  function handleClick() {
    console.log(tx);
    tonConnectUi.sendTransaction(tx);
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
        type="number"
        value={amount}
        placeholder="TON per Member"
        onChange={handleAmountChange}
      />

      <div className="room-page-admin-controls-split-sum">Total: {splittedValue} TON</div>
      <button onClick={handleClick}>Send transaction</button>
    </div>
  );
}

function MembersList({ members }: { members: MemberType[] | null }) {
  return (
    <div className="members-list">
      {members !== null && members?.length !== 0 ? (
        members.map((member) => <Member member={member} />)
      ) : (
        <div className="room-page-no-members">No members yet!</div>
      )}
    </div>
  );
}

function Member({ member }: { member: MemberType }) {
  return (
    <div className="room-page-member">
      <div className="room-page-member-emoji">{randomEmoji()}</div>
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
