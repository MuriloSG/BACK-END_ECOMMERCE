import { Router } from "express";
import {celebrate, Joi ,Segments } from "celebrate";
import OrdersController from "../controllers/OrdersController";
import isAuthenticate from "@shared/http/middlewares/isAuthenticate";

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(isAuthenticate);

ordersRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  ordersController.show
);

ordersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    }
  }),
  ordersController.create
);


export default ordersRouter;
