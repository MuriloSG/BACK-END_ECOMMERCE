import customerRoutes from "@modules/customer/routes/customers.routes";
import ordersRouter from "@modules/orders/routes/orders.routes";
import productsRouter from "@modules/products/routes/products.routes";
import passwordRoutes from "@modules/users/routes/password.routes";
import profileRoutes from "@modules/users/routes/profile.routes";
import sessionsRoutes from "@modules/users/routes/sessions.routes";
import usersRoutes from "@modules/users/routes/users.routes";
import { Router } from "express";

const routes = Router();

routes.use("/products", productsRouter);

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/password", passwordRoutes);
routes.use("/profile", profileRoutes);

routes.use("/customers", customerRoutes);

routes.use("/orders", ordersRouter);

export default routes;
