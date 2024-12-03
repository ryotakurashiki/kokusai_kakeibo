import { sequelize } from "./models";
import { router } from "./routes/router";
import * as consolidate from "consolidate";
import * as express from "express";
import * as path from "path";
import * as session from "express-session";

const app = express();
const PORT: number = 3000;

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

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
