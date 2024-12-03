import "express-session";

declare module "express-session" {
  interface SessionData {
    user_id: number; // 必要な型を指定
  }
}