import * as express from 'express';

/**
 * ログイン認証
 */
export function login_auth_handler(): express.RequestHandler {
  return (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect('/login');
      return;
    }
    next();
  };
}
