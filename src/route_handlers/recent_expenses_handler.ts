import * as express from "express";
import { async_handler } from "../middlewares";
import { models } from "../models";

export function recent_expenses_handler(): express.RequestHandler {
  return async_handler(async (req, res, next) => {
    const kakeibo_id = req.session.kakeibo_id;
    const expenses = await models.Expense.scope(['with_currency', 'with_category', 'order_newly_paid', 'recent']).findAll({ where: {kakeibo_id} });
    res.json({ expenses });
  });
}
