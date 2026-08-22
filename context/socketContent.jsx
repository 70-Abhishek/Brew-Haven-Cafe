import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

// Create context with nullable socket
const SocketContext = createContext(null);

// Hook to use socket anywhere
export const useSocket = () => {
  const context = useContext(SocketContext);
  return context; // May be null
};

// Provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to backend – replace with your actual backend IP/port
    const newSocket = io('http://10.60.100.140:5000');
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};