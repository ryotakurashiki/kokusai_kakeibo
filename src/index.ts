import * as http from 'http';
import * as mysql from "mysql2";

process.title = "test";

// MySQLの接続設定
// 環境変数からDB接続情報を取得
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "password";
const DB_NAME = process.env.DB_NAME || "kokusai_kakeibo_dev";

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// データベース接続確認
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log("Connected to the MySQL database.");
});

const PORT: number = 3000;
const server: http.Server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, Node.js with Docker!');
  }
);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/ test`);
});
