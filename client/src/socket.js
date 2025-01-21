import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SERVER_URL || "http://192.168.1.181:3000";

export const socket = io(URL);
