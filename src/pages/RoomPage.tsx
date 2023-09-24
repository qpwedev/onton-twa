import { useContext } from "react";
import { useTonConnect } from "../hooks/useTonConnect";
import { RoomContext } from "../contexts/RoomContext";
import { Member as MemberType } from "../types";

import "./RoomPage.css";
import { randomEmoji } from "../utils";
import { TonConnectButton } from "@tonconnect/ui-react";

export default function RoomPage() {
  const roomId = window.location.pathname.split("/")[2];

  const { room, setRoom } = useContext(RoomContext);

  const { wallet } = useTonConnect();

  return (
    <div className="room-page-wrapper">
        <TonConnectButton />
      <div className="room-page-name-wrapper">
        <div className="room-page-name">{room?.name}</div>
        <div className="room-members-amount">{room.Members.length} members</div>
      </div>
      {room?.admin_wallet === wallet && (
        <div className="room-page-admin">You are admin</div>
      )}

      <MembersList members={room.Members} />
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
