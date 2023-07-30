import { pseudoRandomBytes } from "crypto";
import React from "react";
import socket from "../socket";

type ChatType = {
  joined: boolean;
  roomId: string;
  userName: any;
  users: any[];
  messages: any[];
  onAddMessage: (message: any) => void;
};

const Chat: React.FC<ChatType> = ({
  roomId,
  userName,
  users,
  messages,
  onAddMessage,
}) => {
  const [messageValue, setMessageValue] = React.useState<string>("");
  const messagesRef = React.useRef(null);

  const onSendMessage = () => {
    socket.emit("ROOM:NEW_MESSAGE", {
      roomId: roomId,
      userName: userName,
      text: messageValue,
    });
    onAddMessage({
      userName,
      text: messageValue,
    });
    setMessageValue("");
  };

  React.useEffect(() => {
    // @ts-ignore
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  return (
    <div className="mt-10 border flex flex-row rounded-xl h-96">
      <div className="w-48 bg-slate-200 p-4 overflow-scroll">
        <h2>{"Room: " + roomId}</h2>
        <hr />
        <h3 className="font-semibold mb-4">{`Online (${users.length}):`}</h3>
        <ul>
          {users.map((userName: string, i: number) => (
            <li
              key={userName + i * 123232435}
              className="font-medium p-2 mb-1 bg-slate-50 rounded-md"
            >
              {userName}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-80 flex flex-col h-full justify-between">
        <div ref={messagesRef} className="overflow-scroll">
          {messages.map((message: any, index: number) => (
            <div key={index + "_" + message.text} className="m-5">
              <div className="bg-violet-500 text-white rounded-md py-2 px-4 max-w-fit">
                {message.text}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {message.userName}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t flex flex-row justify-self-end h-12">
          <textarea
            className="border m-1 pt-1.5 pl-2 rounded-md flex-1 focus:outline-none rows-1"
            onChange={(e) => setMessageValue(e.target.value)}
            value={messageValue}
          ></textarea>
          <button
            onClick={onSendMessage}
            className="justify-self-end border px-4 m-1 bg-blue-600 text-white rounded-xl"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
