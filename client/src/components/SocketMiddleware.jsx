import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { socket } from "../socket";
import { socketId } from "../playerSlice";

const SocketMiddleware = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected: ${socket.id}`);
      dispatch(socketId({ socketId: socket.id }));
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error: ", err?.message);
      setTimeout(() => socket.connect(), 5000);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, [dispatch]);

  return <>{children}</>;
};

export default SocketMiddleware;
