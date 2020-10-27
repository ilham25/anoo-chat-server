import Express from "express";
import Http from "http";
import SocketIo from "socket.io";
import Cors from "cors";
import Dotenv from "dotenv";
import Sql from "./mysql.js";

Dotenv.config();
const app = Express();

app.use(Cors());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

const port = process.env.PORT || 3030;
const server = Http.createServer(app);
const sql = Sql();

const io = SocketIo(server);

app.get("/", (req, res) => {
  sql.get((result) => {
    res.send(result);
  });
});

app.get("/reset", (req, res) => {
  sql.reset();
  res.send("data reset!");
});

io.on("connection", (socket) => {
  socket.on("chat message", (usr, msg) => {
    sql.insert([usr, msg]);
    sql.get((result) => {
      io.emit("chat received", result);
    });
  });
});

server.listen(port, () => console.log(`listening to http://localhost:${port}`));
