import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext({
  adminRoom: null,
  setAdminRoom: null,
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState = JSON.parse(localStorage.getItem("adminRoom")) || {
    roomName: null,
    roomPassword: null,
    roomAdmin: null,
  };

  const [adminRoom, setAdminRoom] = useState(initialState);

  useEffect(() => {
    localStorage.setItem('adminRoom', JSON.stringify(adminRoom));
  }, [adminRoom]);

  return (
    <AdminContext.Provider value={{ adminRoom, setAdminRoom }}>
      {children}
    </AdminContext.Provider>
  );
};
