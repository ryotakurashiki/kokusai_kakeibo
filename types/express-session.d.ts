import "express-session";

declare module "express-session" {
  interface Session {
    user_id: number; // 必要な型を指定
  }
}