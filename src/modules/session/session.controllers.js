import { createToken } from "../../utils/jwt.js";
import {request, response} from "express"

const userRegister = async (req = request, res = response) => {
    try {
        return res.status(201).json({ status: "ok", msg: "User created" });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const userLogin = async (req = request, res = response) => {
    try {
        const token = createToken(req.user);
        res.cookie("token",token,{httpOnly: true});
        return res.status(200).json({ status: "ok", payload: req.user });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const userCurrent = async (req = request, res = response) => {
    try {
        return res.status(200).json({ status: "ok", payload: req.user });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

export default {userRegister, userLogin, userCurrent}