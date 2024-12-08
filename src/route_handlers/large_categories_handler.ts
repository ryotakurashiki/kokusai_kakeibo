import * as express from "express";
import { async_handler } from "../middlewares";
import { models } from "../models";

export function large_categories_handler(): express.RequestHandler {
  return async_handler(async (req, res, next) => {
    const large_categories = await models.LargeCategory.scope('with_middle_category').findAll();
    res.json({
      large_categories
    });
  });
}
