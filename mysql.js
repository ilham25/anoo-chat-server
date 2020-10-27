import Mysql from "mysql";

export default function Sql() {
  const db = Mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  const get = (cb) => {
    const sqlGet = "SELECT * FROM msg_table";
    db.query(sqlGet, (err, res) => {
      if (err) throw err;
      console.log("data get");
      cb(res);
    });
  };

  const insert = (data) => {
    const sqlInsert = "INSERT INTO msg_table (username,message) VALUES (?,?)";
    db.query(sqlInsert, data, (err, res) => {
      if (err) throw err;
      console.log("data insert");
    });
  };

  const reset = () => {
    const sqlReset = "TRUNCATE anoo_chat.msg_table";
    db.query(sqlReset, (err, res) => {
      if (err) throw err;
      console.log("data reset");
    });
  };

  return {
    get,
    insert,
    reset,
  };
}
