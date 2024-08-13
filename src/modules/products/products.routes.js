import { Router } from "express";
import productsControllers from "./product.controllers.js";

const router = Router();


router.get("/", productsControllers.getAllProduct)

router.get("/:pid", productsControllers.getProductById)

router.post("/", productsControllers.createProduct)

router.put("/:pid", productsControllers.upDateProduct)

router.delete("/:pid", productsControllers.deleteProduct)

export default router;