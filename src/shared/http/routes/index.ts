import productsRouter from "@modules/products/routes/products.routes";
import passwordRoutes from "@modules/users/routes/password.routes";
import sessionsRoutes from "@modules/users/routes/sessions.routes";
import usersRoutes from "@modules/users/routes/users.routes";
import { Router } from "express";

const routes = Router();

routes.use("/products", productsRouter);
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/password", passwordRoutes);

export default routes;
