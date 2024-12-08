import { api_auth_handler, login_auth_handler } from './middlewares';
import * as express from 'express';
import { home_handler, login_entry_handler, login_handler, sign_up_entry_handler, sign_up_handler, top_handler, expense_registration_handler } from "./route_handlers/login_handler";
import { home_data_handler } from './route_handlers/home_data_handler';
import { currencies_handler } from './route_handlers/currencies_handler';
import { large_categories_handler } from './route_handlers/large_categories_handler';
import { create_expense_handler } from './route_handlers/create_expense_handler';

export const router = express.Router();

router.get("/", login_auth_handler(), top_handler());
router.get("/home", login_auth_handler(), home_handler());
router.get("/expense_registration", login_auth_handler(), expense_registration_handler());
router.get("/sign_up", sign_up_entry_handler());
router.post("/sign_up", sign_up_handler());
router.get('/login', login_entry_handler());
router.post('/login', login_handler());

// API
router.get('/home_data', api_auth_handler(), home_data_handler());
router.get('/currencies', api_auth_handler(), currencies_handler());
router.get('/large_categories', api_auth_handler(), large_categories_handler());
router.post('/create_expense', api_auth_handler(), create_expense_handler());

