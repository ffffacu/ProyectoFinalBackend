import { Router } from "express";
import productsRoutes from "../modules/products/products.routes.js";
import cartsRoutes from  "../modules/carts/carts.routes.js";
import sessionRoutes from  "../modules/session/session.routes.js";

const router = Router();

router.use("/products", productsRoutes);
router.use("/carts", cartsRoutes);
router.use ("/session", sessionRoutes);



export default router;