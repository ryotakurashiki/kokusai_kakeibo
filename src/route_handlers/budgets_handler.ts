import * as express from "express";
import { async_handler } from "../middlewares";
import { models } from "../models";

export function budgets_handler(): express.RequestHandler {
  return async_handler(async (req, res, next) => {
    const kakeibo_id = req.session.kakeibo_id;
    const budget_with_results = await models.Budget.find_by_kakeibo_id_with_result(kakeibo_id);
    res.json({ budget_with_results });
  });
}
