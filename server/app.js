import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/database.js"
import bodyParser from "body-parser"
import userRouter from "./routes/user.routes.js"
import todoRouter from "./routes/todo.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express()
dotenv.config()
connectDB()

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials:true
}))
app.use("/api/v1/user",userRouter)
app.use("/api/v1/todo",todoRouter)


const port = process.env.PORT||3000;

// console.log(express)

app.listen(port,()=>{
console.log( `Server is running ${port}`)
})


