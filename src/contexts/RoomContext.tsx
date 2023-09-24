import { createContext, useEffect, useState } from "react";

export const RoomContext = createContext({ room: null, setRoom: null });

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState = JSON.parse(localStorage.getItem("room")) || {};

  const [room, setRoom] = useState(initialState);

  useEffect(() => {
    localStorage.setItem('room', JSON.stringify(room));
  }, [room]);

  return (
    <RoomContext.Provider value={{ room, setRoom }}>
      {children}
    </RoomContext.Provider>
  );
};
