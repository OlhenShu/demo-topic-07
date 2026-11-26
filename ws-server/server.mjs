import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket, request) => {
  const url = new URL(request.url, "http://localhost");
  const room = url.searchParams.get("room") ?? "general";
  console.log(`+ client in room:${room}, total ${wss.clients.size}`);
  socket.send(`Welcome to room:${room}`);

  socket.on("message", (data) => {
    socket.send(`echo: ${data}`);
  });
  socket.on("close", () => {
    console.log(`- client left room:${room}`);
  });
});

console.log("ws://localhost:8080 is ready");
