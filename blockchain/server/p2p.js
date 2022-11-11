//import socket
import { Server } from "socket.io";
import { io } from "socket.io-client";
import * as http from "http";
import { app } from "./api.js";
import { Block, Chain } from "../chain/chain.js";
const httpServer = http.createServer(app);
const server = new Server(httpServer);

let opened = [];
let connected = [];
//read config.yml
import * as fs from "fs";
import * as yaml from "js-yaml";
const config = yaml.load(fs.readFileSync("./server/config.yml", "utf8"));
const myAddress = config.myAddress || "ws://localhost:3000";
server.on("connection", (socket) => {
  console.log("user connected");
  // establishing mesh connection
  socket.on("HANDSHAKE", (data) => {
    console.log("HANDSHAKE", data);
    data.peers.forEach((peer) => {
        connect(peer);
    });
  });
  socket.on("NEW BLOCK", (data) => {
    console.log("NEW BLOCK", data);
  });
  socket.on("REQUEST CHAIN", (data) => {
    console.log("REQUEST CHAIN", data);
    const address = data.address;
    let conn; 
    if ((conn = opened.find((peer) => peer.address === address))) {
      conn.socket.emit("SEND CHAIN", {
        chain: Chain.instance.chain,
      });
    } else {
      connect(address, "SEND CHAIN");
    }
  });
  socket.on("SEND CHAIN", (data) => {
    console.log("SEND CHAIN", data);
  });
});

async function connect(address, action = null) {
  console.log('connected array',connected)
  if (
    !connected.find((peer) => peer.address === address) &&
    address !== myAddress
  ) {
    const socket = io(address);
    socket.on("connect", () => {
      // share other peers with connected peer
      socket.emit("HANDSHAKE", { peers: [myAddress, ...connected] });
      // share connected peer with other peers
      opened.forEach((peer) =>
        socket.emit("HANDSHAKE", { peers: [peer.address] })
      );
      // add connected peer to opened
      if (
        !opened.find((peer) => peer.address === address) &&
        address !== myAddress
      ) {
        opened.push({ address, socket });
      }
      // add connected peer to connected
      if (
        !connected.find((peerAddress) => peerAddress === address) &&
        address !== myAddress
      ) {
        connected.push(address);
      }
      if (action === "REQUEST CHAIN") {
        broadcast("REQUEST CHAIN", { address: myAddress });
      }
      if (action === "SEND CHAIN") {
        socket.emit("SEND CHAIN", {
          chain: Chain.instance.chain,
        });
      }
    });
    //disconnected
    socket.on("disconnect", () => {
      opened = opened.filter((peer) => peer.address !== address);
      connected = connected.filter((peer) => peer !== address);
    });
  }
}

async function broadcast(type, message) {
  if (type === "NEW BLOCK") {
    opened.forEach((peer) =>
      peer.socket.emit("NEW BLOCK", {
        data: message.data,
        previousHash: message.previousHash,
        hash: message.hash,
        timestamp: message.timestamp,
        type: message.type,
        signature: message.signature,
        issuerId: message.issuerId,
      })
    );
  }
  if (type === "REQUEST CHAIN") {
    opened.forEach((peer) =>
      peer.socket.emit("REQUEST CHAIN", {
        address: message.address,
      })
    );
  }
}

// httpServer.listen(port, () =>
//   console.log(`Example app listening on port ${port}!`)
// );

export { broadcast, httpServer, connect, opened, connected };
