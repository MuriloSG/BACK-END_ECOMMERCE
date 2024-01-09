import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import multer from "multer";
import uploadConfig from "@config/upload";
import UsersController from "../controllers/UsersController";
import isAuthenticate from "../../../shared/http/middlewares/isAuthenticate";
import UserAvatarController from "../controllers/UserAvatarController";

const usersRoutes = Router();
const usersControllers = new UsersController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRoutes.get("/",isAuthenticate, usersControllers.index);

usersRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      isAdmin: Joi.boolean().required(),
      password: Joi.string().required(),
    }
  }),
  usersControllers.create
);

usersRoutes.patch(
  "/avatar",
  isAuthenticate,
  upload.single("avatar"),
  usersAvatarController.update
);

export default usersRoutes;
