import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`); 

const SocketProvider = ({ children }) => {

    useEffect(() => {
        socket.on('connect', () => {
          console.log('Connected to server with socket ID:', socket.id);
        });
      
        socket.on('disconnect', () => {
          console.log('Disconnected from server');
        });
      
        return () => {
          socket.off('connect');
          socket.off('disconnect');
        };
      }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;