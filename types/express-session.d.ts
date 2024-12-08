import "express-session";

declare module "express-session" {
  interface Session {
    user_id: number;
    kakeibo_id: number;
  }
}