import { httpServer, connect, opened, connected } from "./p2p.js";

const port = 3000;
httpServer.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

connect("ws://143.198.209.169:3000", true);