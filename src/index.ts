import { sequelize, models } from "./models";
import * as http from 'http';
import * as bcrypt from "bcrypt";

const startApp = async () => {
  try {
    await sequelize.authenticate();

    // test
    // サンプルデータの追加
    const user = await models.User.findByPk(1);
    if (user) {
      // console.log("User found:", user);

      // パスワード設定
      // const password = "test";
      // const saltRounds = 10;
      // const hash = await bcrypt.hash(password, saltRounds);
      // await user.update({password: hash});

      // パスワード認証
      const isMatch = await bcrypt.compare("test", user.password);
      console.log("isMatch", isMatch);
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
