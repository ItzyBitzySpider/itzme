import { httpServer, connect, opened, connected } from "./p2p.js";

import * as fs from "fs";
import * as yaml from "js-yaml";
const config = yaml.load(fs.readFileSync("./server/config.yml", "utf8"));
const peerAddress = config.peerAddress;
console.log(peerAddress)
if(peerAddress){
    connect(peerAddress, "REQUEST CHAIN");
}