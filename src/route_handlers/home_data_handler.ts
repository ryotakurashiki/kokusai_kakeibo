import * as express from "express";
import { async_handler } from "../middlewares";
import { models } from "../models";

export function home_data_handler(): express.RequestHandler {
  return async_handler(async (req, res, next) => {
    const kakeibo = await models.Kakeibo.find_by_user_id(req.session.user_id);
    const expenses = await models.Expense.scope(['with_currency', 'with_category', 'order_newly_paid', 'recent']).findAll({ where: {kakeibo_id: kakeibo?.id} });
    const budget_with_results = await models.Budget.find_by_kakeibo_id_with_result(kakeibo!.id);
    console.log(budget_with_results, budget_with_results);
    res.json({
      kakeibo,
      expenses,
      budget_with_results,
    });
  });
}
