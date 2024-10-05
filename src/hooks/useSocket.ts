import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_BACKEND_URL_WS as string;

interface UseSocketResult {
  socket: Socket | null;
  message: string;
}

export const useSocket = (): UseSocketResult => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const newSocket: Socket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log(`Conectado con ID: ${newSocket.id}`);
      //newSocket.emit('exampleEvent', {
      //  msg: 'Client from React was connected',
      //})
    });

    newSocket.on("project-status", (data) => {
      //console.log(`Respuesta del servidor status: ${data}`);
      setMessage(data);
    });

    // clear conexion
    return () => {
      newSocket.close();
    };
  }, []);

  return { socket, message };
};
