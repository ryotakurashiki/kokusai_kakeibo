import * as express from "express";
import { async_handler } from "../middlewares";
import { models } from "../models";

export function create_expense_handler(): express.RequestHandler {
  return async_handler(async (req, res, next) => {
    const attributes = { ...req.body, ...{ kakeibo_id: req.session.kakeibo_id } };
    console.log("attributes", attributes);
    await models.Expense.create(attributes);
    res.status(200).json({});
  });
}
