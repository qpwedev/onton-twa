export type Room = {
  id: number;
  name: string;
  password: string;
  admin_wallet: string;
  createdAt: string;
  updatedAt: string;
  Members: Member[];
};

export type Member = {
  id: number;
  address: string;
  roomId: number;
  createdAt: string;
  updatedAt: string;
};

export type Schema = {
  room: Room;
};

export interface MembersListProps {
  members: Member[] | null;
}
