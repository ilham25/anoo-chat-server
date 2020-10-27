import Express from "express";
import Http from "http";
import SocketIo from "socket.io";

const app = Express();

const port = process.env.PORT || 3030;
const server = Http.createServer(app);

const io = SocketIo(server);

io.on("connection", (socket) => {
  socket.on("chat message", (usr, msg) => {
    io.emit("chat received", usr, msg);
  });
});

server.listen(port, () => console.log(`listening to http://localhost:${port}`));
