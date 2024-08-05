import express from 'express';
import router from './router/index.routes.js';
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import {Server} from "socket.io";
import session from "express-session";
import viewsRoutes from "./router/views.routes.js";
import {connectMongoDB} from "./config/mongoDB.config.js";
import envs from "./config/envs.config.js";
import { initializePassport } from './config/passport.config.js';
import cookieParser from "cookie-parser";


const app = express();

connectMongoDB()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.engine("handlebars", handlebars.engine());
app.set("views",__dirname+"/views")
app.set("view engine","handlebars");
app.use(express.static("public"));
app.use (cookieParser());
app.use(session({
    secret:envs.SECRET_CODE,
    resave:true,
    saveUninitialized:true
}))

initializePassport()

app.use("/api", router);
app.use("/", viewsRoutes);

const https = app.listen(envs.PORT, ()=>{ console.log(` Server is in port ${envs.PORT}`);})
export const newServer = new Server(https);


newServer.on("connection", (socket)=>{
    console.log("New user connection");
})