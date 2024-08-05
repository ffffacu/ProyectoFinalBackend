import { Router } from "express";
import { passportCall } from "../middlewares/passport.middleware.js";
import { createToken } from "../utils/jwt.js";

const router = Router();

router.post("/register", passportCall("register"), async (req, res) => {
    try {
        return res.status(201).json({ status: "ok", msg: "User created" });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
})

router.post("/login", passportCall("login"), async (req, res) => {
    try {
        const token = createToken(req.user);
        res.cookie("token",token,{httpOnly: true});
        return res.status(200).json({ status: "ok", payload: req.user });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
})

router.get("/current", passportCall("current"), async (req, res) => {
    try {
        return res.status(200).json({ status: "ok", payload: req.user });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
})

export default router;