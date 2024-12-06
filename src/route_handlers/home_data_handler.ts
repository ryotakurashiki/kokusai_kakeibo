import * as express from "express";
import { async_handler } from "../middlewares";
import { models } from "../models";

export function home_data_handler(): express.RequestHandler {
  return async_handler(async (req, res, next) => {
    const kakeibo = await models.Kakeibo.find_by_user_id(req.session.user_id);
    const expenses = await models.Expense.scope(['with_currency', 'with_category']).findAll({ where: {kakeibo_id: kakeibo?.id} });
    res.json({
      kakeibo,
      expenses
    });
  });
}
