import React from "react";
// import io from "socket.io-client";
import JoinBlock from "./components/JoinBlock";
import reducer from "./reducer";
import socket from "./socket";
import Chat from "./components/Chat";
import axios from "axios";

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  const onLogin = async (obj: { roomId: string; userName: string }) => {
    dispatch({
      type: "JOINED",
      payload: obj,
    });
    socket.emit("ROOM:JOIN", obj);
    const { data } = await axios.get(
      `http://localhost:5000/rooms/${obj.roomId}`
    );
    dispatch({
      type: "SET_DATA",
      payload: data,
    });
  };

  const addMessage = (message: any) => {
    dispatch({
      type: "NEW_MESSAGE",
      payload: message,
    });
  };

  React.useEffect(() => {
    socket.on("ROOM:SET_USERS", (users) => {
      dispatch({
        type: "SET_USERS",
        payload: users,
      });
    });
    socket.on("ROOM:NEW_MESSAGE", addMessage);
  }, []);

  return (
    <div className="flex items-center justify-center">
      {state.joined ? <Chat {...state} onAddMessage={addMessage} /> : <JoinBlock onLogin={onLogin} />}
    </div>
  );
}

export default App;
