import * as express from "express";
import { async_handler } from "../middlewares";
import { models } from "../models";

export function currencies_handler(): express.RequestHandler {
  return async_handler(async (req, res, next) => {
    const currencies = await models.Currency.findAll();
    res.json({
      currencies
    });
  });
}
