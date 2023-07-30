import axios from "axios";
import React, { useState } from "react";

type JoinBlockType = {
  onLogin: (obj: { roomId: string; userName: string }) => void;
};

const JoinBlock: React.FC<JoinBlockType> = ({ onLogin }) => {
  const [roomId, setRoomId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const onClickConnect = async () => {
    if (!roomId || !userName) {
      return alert("invalid data");
    }
    const obj = {roomId, userName}
    setLoading(true);
    await axios.post("http://localhost:5000/rooms", obj);
    onLogin(obj);
    setLoading(false);
  };

  return (
    <div className="mt-10 border flex flex-col rounded-xl p-4">
      <input
        className="border-b m-4 outline-none"
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        className="border-b m-4 outline-none"
        type="text"
        placeholder="Your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button
        className="border bg-gray-100 h-10 rounded-xl"
        onClick={onClickConnect}
        disabled={isLoading}
      >
        {isLoading ? "connecting..." : "connect"}
      </button>
    </div>
  );
};

export default JoinBlock;
