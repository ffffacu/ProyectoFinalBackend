import dotenv from "dotenv";


dotenv.config();

export default{
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    SECRET_CODE: process.env.SECRET_CODE,
    CODE_GOOGLE_Gmail: process.env.CODE_GOOGLE_GMAIL
}