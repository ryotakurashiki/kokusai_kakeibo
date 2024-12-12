import * as express from "express";
import { async_handler } from "../middlewares";
import { models } from "../models";

export function last_expense_handler(): express.RequestHandler {
  return async_handler(async (req, res, next) => {
    const kakeibo_id = req.session.kakeibo_id;

    const expense = await models.Expense.scope(['order_newly_created']).findOne({
      where: { kakeibo_id }
    });
    res.json({
      expense
    });
  });
}
