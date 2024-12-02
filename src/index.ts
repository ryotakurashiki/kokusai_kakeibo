import { sequelize } from "./models";
import { router } from "./router";
import * as consolidate from "consolidate";
import * as express from "express";
import * as path from "path";

const app = express();
const PORT: number = 3000;

// ビューテンプレートエンジンの設定
app.engine("slm", consolidate.slm);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "slm");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);

const startApp = async () => {
  try {
    await sequelize.authenticate();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/ test`);
    });

  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startApp();
