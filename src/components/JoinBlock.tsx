import React from "react";

const JoinBlock : React.FC = () => {
  const onClickConnect = () => {
    // io("http://localhost:5000");
  };

  return (
    <div className="mt-10 border flex flex-col rounded-xl p-4">
      <input
        className="border-b m-4 outline-none"
        type="text"
        placeholder="Room ID"
      />
      <input
        className="border-b m-4 outline-none"
        type="text"
        placeholder="Your name"
      />
      <button
        className="border bg-gray-100 h-10 rounded-xl"
        onClick={onClickConnect}
      >
        connect
      </button>
    </div>
  );
};

export default JoinBlock
