import {Router} from 'express';
import cartControllers from "./cart.controllers.js"
import cartDao from './cart.dao.js';
import { checkProductAndCart } from '../../middlewares/checkProductAndCart.middlewares.js';

const router = Router();

router.post("/", cartControllers.createCart)

router.get("/:cid",cartControllers.getCartById )

router.get("/", cartControllers.getCartAll )

router.post("/:cid/product/:pid",checkProductAndCart,cartControllers.addProductToCart)

router.put("/:cid/product/:pid",checkProductAndCart, cartControllers.upDateQuantityProductToCart)

router.delete("/:cid/product/:pid",checkProductAndCart, cartControllers.deleteProductToCart)

router.delete("/:cid", cartControllers.deleteAllProductToCart)

export default router;