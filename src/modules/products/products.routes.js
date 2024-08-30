import { Router } from "express";
import {authorization } from "../../middlewares/authorization.middleware.js";
import {passportCall}   from "../../middlewares/passport.middleware.js";
import productsControllers from "./product.controllers.js";

const router = Router();


router.get("/", productsControllers.getAllProduct)

router.get("/:pid", productsControllers.getProductById)

router.post("/",passportCall("current"),authorization("admin"), productsControllers.createProduct)

router.put("/:pid",passportCall("current"),authorization("admin"), productsControllers.upDateProduct)

router.delete("/:pid",passportCall("current"),authorization("admin"), productsControllers.deleteProduct)

export default router;