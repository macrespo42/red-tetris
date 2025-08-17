import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SERVER_URL || "redtetris.duckdns.org";

export const socket = io(URL);
