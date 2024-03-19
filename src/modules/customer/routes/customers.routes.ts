import { Router } from "express";
import CustomersController from "../controllers/CustomersController";
import isAuthenticate from "@shared/http/middlewares/isAuthenticate";
import { Joi, Segments, celebrate } from "celebrate";

const customerRoutes = Router();

customerRoutes.use(isAuthenticate);

const customersControllers = new CustomersController();

customerRoutes.get("/", customersControllers.index);

customerRoutes.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid()
    }
  }),
  customersControllers.show
);

customerRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),

    }
  }),
  customersControllers.create
);

customerRoutes.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),

    }
  }),
  customersControllers.update
);

customerRoutes.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid()
    }
  }),
  customersControllers.delete
);

export default customerRoutes;
