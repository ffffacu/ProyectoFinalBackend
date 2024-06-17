import express from 'express';
import router from './router/index.routes.js';
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import {Server} from "socket.io";
import viewsRoutes from "./router/views.routes.js";
import {connectMongoDB} from "./config/mongoDB.config.js"


const PORT = 8080;
const app = express();

connectMongoDB()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.engine("handlebars", handlebars.engine());
app.set("views",__dirname+"/views")
app.set("view engine","handlebars");
app.use(express.static("public"));

app.use("/api", router);
app.use("/", viewsRoutes);

const https = app.listen(PORT, ()=>{ console.log(` El servidor se esta escuchando en el puerto ${PORT}`);})
export const newServer = new Server(https);


newServer.on("connection", (socket)=>{
    console.log("New user connection");
})