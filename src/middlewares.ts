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

/**
 * API認証
 */
export function api_auth_handler(): express.RequestHandler {
  return async (req, res, next) => {
    try {
      // Cookie認証
      if (req.session.user_id) {
        return next();
      }
    } catch (e) {
      console.log("API認証失敗")
    }

    res.sendStatus(400);
  };
}