import { Router } from "express";
import { passportCall } from "../../middlewares/passport.middleware.js";
import sessionControllers from "./session.controllers.js";


const router = Router();

router.post("/register", passportCall("register"), sessionControllers.userRegister);

router.post("/login", passportCall("login"), sessionControllers.userLogin);

router.get("/current", passportCall("current"), sessionControllers.userCurrent);

export default router;