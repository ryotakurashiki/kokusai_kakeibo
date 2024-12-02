import { sequelize, models } from "./models";
import * as http from 'http';

const startApp = async () => {
  try {
    await sequelize.authenticate();

    // test
    // サンプルデータの追加
    const user = await models.User.findAll({
      include: [
        { model: models.Kakeibo }
      ],
      limit: 1
    });
    if (user) {
      console.log("User found:", user);
    }

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

  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startApp();
