import React from "react";
import io from "socket.io-client";
import JoinBlock from "./components/JoinBlock";


function App() {
  
  return (
    <div className="flex items-center justify-center">
      <JoinBlock />
    </div>
  );
}

export default App;
