import { useContext, useState } from "react";
import { useTonConnect } from "../hooks/useTonConnect";
import { RoomContext } from "../contexts/RoomContext";
import { Member as MemberType, Room } from "../types";

import "./RoomPage.css";
import { randomEmoji } from "../utils";
import { TonConnectButton } from "@tonconnect/ui-react";
import { ServerURL } from "../constants";

export default function RoomPage() {
  const roomId = window.location.pathname.split("/")[2];

  const { room, setRoom } = useContext(RoomContext);

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
      {room?.admin_wallet === wallet && <AdminControls room={room} />}

      <MembersList members={room.Members} />
    </div>
  );
}

function AdminControls({ room }: { room: Room }) {
  const [amount, setAmount] = useState(0);
  const splittedValue = room.Members.length * (amount >= 0 ? amount : 0)

  function handleClick() {
    
  }

  return (
    <div className="room-page-admin-controls">
      <input
        className="room-page-admin-controls-amount-input"
        type="number"
        step={0.0001}
        value={amount}
        onChange={(e) => setAmount(Number.parseFloat(e.target.value))}
      />
      <div className="room-page-admin-controls-split-sum">
        {splittedValue}
      </div>
      <button onClick={handleClick}>Send</button>
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
