import { useContext } from "react";
import { useTonConnect } from "../hooks/useTonConnect";
import { RoomContext } from "../contexts/RoomContext";
import { Member as MemberType } from "../types";

import "./RoomPage.css";
import { randomEmoji } from "../utils";

const mockMembers = [
  {
    id: 1,
    address: "0x1234567890123456789012345678901234567890",
    roomId: 1,
    createdAt: "2023-09-23T17:07:09.686Z",
    updatedAt: "2023-09-23T17:07:09.686Z",
  },
  {
    id: 2,
    address: "0x1234567890123456789012345678901234567890",
    roomId: 1,
    createdAt: "2023-09-23T17:07:10.847Z",
    updatedAt: "2023-09-23T17:07:10.847Z",
  },
  {
    id: 3,
    address: "0x1234567890123456789012345678901234567890",
    roomId: 1,
    createdAt: "2023-09-23T17:07:11.196Z",
    updatedAt: "2023-09-23T17:07:11.196Z",
  },
  {
    id: 4,
    address: "0x1234567890123456789012345678901234567890",
    roomId: 1,
    createdAt: "2023-09-23T17:07:11.426Z",
    updatedAt: "2023-09-23T17:07:11.426Z",
  },
  {
    id: 5,
    address: "0x1234567890123456789012345678901234567890",
    roomId: 1,
    createdAt: "2023-09-23T17:07:11.662Z",
    updatedAt: "2023-09-23T17:07:11.662Z",
  },
  {
    id: 6,
    address: "0x1234567890123456789012345678901234567890",
    roomId: 1,
    createdAt: "2023-09-23T17:07:11.886Z",
    updatedAt: "2023-09-23T17:07:11.886Z",
  },
  {
    id: 7,
    address: "0x1234567890123456789012345678901234567890",
    roomId: 1,
    createdAt: "2023-09-23T17:07:12.103Z",
    updatedAt: "2023-09-23T17:07:12.103Z",
  },
  {
    id: 8,
    address: "0x1234567890123456789012345678901234567890",
    roomId: 1,
    createdAt: "2023-09-23T17:07:12.363Z",
    updatedAt: "2023-09-23T17:07:12.363Z",
  },
  {
    id: 9,
    address: "0x1234567890123456789012345678901234567890",
    roomId: 1,
    createdAt: "2023-09-23T17:07:12.549Z",
    updatedAt: "2023-09-23T17:07:12.549Z",
  },
];

export default function RoomPage() {
  const roomId = window.location.pathname.split("/")[2];

  const { room, setRoom } = useContext(RoomContext);

  const { wallet } = useTonConnect();
  mockMembers?.push({
    id: "current-member",
    address: wallet,
  });

  return (
    <div className="room-page-wrapper">
      <div className="room-page-name">{room?.name}</div>
      {room?.admin_wallet !== wallet && (
        <div className="room-page-admin">You are admin</div>
      )}
      <MembersList members={mockMembers} />
    </div>
  );
}

// export type Member = {
//   id: number;
//   address: string;
//   roomId: number;
//   createdAt: string;
//   updatedAt: string;
// };

function MembersList({ members }: { members: MemberType[] | null }) {
  return (
    <div>
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
