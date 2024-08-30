import passport from "passport";
import jwt from "passport-jwt";
import local from "passport-local";
import passportCustom from "passport-custom";
import cartRepository from "../modules/carts/cart.repository.js";
import userRepository from "../modules/session/user.repository.js";
import {createHash, isValidPassword} from "../utils/hashPassword.js";
import { cookieExtractor } from "../utils/cookieExtractor.js";
import { verifyToken } from "../utils/jwt.js";
import { loginDto } from "../dto/session.dto.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const CustomStrategy = passportCustom.Strategy;

export const initializePassport = () =>{
    passport.use("register", new LocalStrategy({passReqToCallback:true, usernameField:"email"}, async(req, username,password,done)=>{
        try {
            const {first_name, last_name, age} = req.body;
            const user = await userRepository.getByEmail(username);
            if(user) return done(null,false,{message:"User already exists"});
            const cart = await cartRepository.create();
            const newUser = {
                first_name,
                last_name,
                password: createHash(password),
                email: username,
                age,
                cart: cart._id
            }
            const userCreate = await userRepository.create(newUser);
            return done(null,userCreate);
        } catch (error) {
            return done(error)
        }   
    }))

    passport.use ("login", new LocalStrategy({usernameField:"email"}, async(username, password,done)=>{
        try {
            const user = await userRepository.getByEmail(username);
            if(!user || isValidPassword(password,user.password))return done(null,false, {message:"User invalid"});
            return done(null, loginDto(user))
        } catch (error) {
            done(error);
        }
    }))

    passport.use ("current", new CustomStrategy( async (req,done)=>{
        try {
            const token = cookieExtractor(req);
            if(!token)return done(null,false, {message:"Expired Session"});
            const tokenVerify = verifyToken(token);
            if(!tokenVerify)return done(null,false, {message:"Expired Session"});
            const user = await userRepository.getByEmail(tokenVerify.email);
            done(null,user)
        } catch (error) {
            done(error)
        }
    }))




    passport.serializeUser((user,done)=>{
        done(null,user._id);
    });
    passport.deserializeUser(async(id,done)=>{
        try {
            const user = await userDao.getById(id);
            done(null,user);
        } catch (error) {
            done(error)
        }
    })

}

