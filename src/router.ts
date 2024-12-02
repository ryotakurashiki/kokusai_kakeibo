import { models } from "./models";
import * as express from 'express';
import * as bcrypt from "bcrypt";

export const router = express.Router();

// ルーティング
router.get("/", (req, res) => {
  res.redirect("/sign_up");
});

router.get("/sign_up", (req, res) => {
  res.render('sign_up');
});

router.get("/home", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  // ダミー認証ロジック
  const user = await models.User.findOne({ where: {email: email} });
  if (user) {
    // パスワード認証
    const is_match = await bcrypt.compare(password, user.password);
    if (is_match) {
      return res.status(200).send("Login successful!");
    }
  }

  res.status(401).send("Invalid email or password.");
});
