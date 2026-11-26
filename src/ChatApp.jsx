import { useEffect, useState } from "react";

const SERVER = "ws://localhost:8080";

function ChatRoom({ roomId }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(`${SERVER}/?room=${roomId}`);
    console.log(`connecting to room:${roomId}`);
    ws.onopen = () => setSocket(ws);
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };
    return () => {
      ws.close(1000, "room changed");
      setSocket(null);
      setMessages([]);
      console.log(`disconnected from room:${roomId}`);
    };
  }, [roomId]);

  return (
    <>
      <button
        disabled={!socket}
        onClick={() => socket.send("Hi!")}
      >
        Say hi
      </button>
      <ul>
        {messages.map((m, i) => <li key={i}>{m}</li>)}
      </ul>
    </>
  );
}

export default function ChatApp() {
  const [roomId, setRoomId] = useState("general");
  return (
    <>
      <select
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      >
        <option value="general">general</option>
        <option value="travel">travel</option>
      </select>
      <ChatRoom roomId={roomId} />
    </>
  );
}
