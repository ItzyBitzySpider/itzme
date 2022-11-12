import { io } from "socket.io-client";

const socket = io("ws://143.198.209.169:3000");

socket.onAny((event, ...args) => {
  console.log(event, args);
});

socket.emit("keys", { name: "John", email: ""});