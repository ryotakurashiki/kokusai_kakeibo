import * as express from "express";
import { Op } from "sequelize";
import { async_handler } from "../middlewares";
import { models } from "../models";
import { current_month, current_year, get_end_of_month, get_start_of_month } from "../common/date";

export function expenses_handler(): express.RequestHandler {
  return async_handler(async (req, res, next) => {
    const kakeibo_id = req.session.kakeibo_id;
    const year = req.query.year ? Number(req.query.year) : current_year();
    const month = req.query.month ? Number(req.query.month) : current_month();

    const expenses = await models.Expense.scope(['with_category', 'with_currency', 'order_early_paid']).findAll({
      where: {
        kakeibo_id: kakeibo_id,
        payment_date: {
          [Op.gte]: get_start_of_month(year, month),
          [Op.lte]: get_end_of_month(year, month),
        }
      }
    });

    res.json({
      expenses
    });
  });
}
