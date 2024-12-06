import * as express from 'express';

/**
 * async/await化
 */
export function async_handler<P, ResBody, ReqBody, Locals>(
  fn: express.RequestHandler<P, ResBody, ReqBody, Locals>
): express.RequestHandler<P, ResBody, ReqBody, Locals> {
  return (...args) => {
    return (fn(...args) as any).catch(args[2]);
  };
}

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
