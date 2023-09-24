import { createContext, useState } from "react";

export const RoomContext = createContext({ room: null, setRoom: null });

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  const [room, setRoom] = useState(null);

  return (
    <RoomContext.Provider value={{ room, setRoom }}>
      {children}
    </RoomContext.Provider>
  );
};
