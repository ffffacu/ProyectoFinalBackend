import {Router} from 'express';
import cartControllers from "./cart.controllers.js"
import { checkProductAndCart } from '../../middlewares/checkProductAndCart.middlewares.js';
import {authorization} from '../../middlewares/authorization.middleware.js';
import {passportCall}   from '../../middlewares/passport.middleware.js';

const router = Router();

router.post("/",passportCall("current"),authorization("user"), cartControllers.createCart)

router.get("/:cid",cartControllers.getCartById )

router.get("/", cartControllers.getCartAll )

router.post("/:cid/product/:pid",passportCall("current"),authorization("user"),checkProductAndCart,cartControllers.addProductToCart)

router.put("/:cid/product/:pid",passportCall("current"),authorization("user"),checkProductAndCart, cartControllers.upDateQuantityProductToCart)

router.delete("/:cid/product/:pid",passportCall("current"),authorization("user"),checkProductAndCart, cartControllers.deleteProductToCart)

router.delete("/:cid",passportCall("current"),authorization("user"), cartControllers.deleteAllProductToCart)

router.get("/purchase/:cid",passportCall("current"),authorization("user"), cartControllers.getPurchaseToCart)

export default router;