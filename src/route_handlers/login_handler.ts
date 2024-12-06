import * as express from "express";
import { async_handler } from "../middlewares";
import { models } from "../models";
import { compare, hash } from 'bcrypt';
import * as path from "path";

/*
 * トップページ
*/
export function top_handler(): express.RequestHandler {
  return (req, res) => {
    res.redirect("/home");
  };
}

/*
 * (ログイン後)ホーム画面
*/
export function home_handler(): express.RequestHandler {
  return (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  };
}

/*
 * 登録画面
*/
export function sign_up_entry_handler(): express.RequestHandler {
  return (req, res) => {
    res.render('sign_up');
  };
}

export function sign_up_handler(): express.RequestHandler {
  return async_handler(async (req, res, next) => {
    const { email, password } = req.body;
    let user = await models.User.findOne({ where: {email: email} });
    if (user) {
      return res.status(200).send("This email is already registered.");
    }
    const kakeibo = await models.Kakeibo.create();
    const salt_rounds = 10;
    const password_hash = await hash(password, salt_rounds);
    user = await models.User.create({ email: email, password: password_hash, kakeibo_id: kakeibo.id });
    req.session.user_id = user.id;
    return res.redirect("/home");
  });
}

/*
 * ログイン画面
*/
export function login_entry_handler(): express.RequestHandler {
  return (req, res) => {
    res.render('login');
  };
}

/*
 * ログイン
*/
export function login_handler(): express.RequestHandler {
  return async_handler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required.");
    }

    const user = await models.User.findOne({ where: {email: email} });
    if (user) {
      // パスワード認証
      const is_match = await compare(password, user.password);
      if (is_match) {
        req.session.user_id = user.id;
        return res.redirect("/home");
      }
    }

    return res.status(401).send("Invalid email or password.");
  });
}
