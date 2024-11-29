import * as http from 'http';

process.title = "test";
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
