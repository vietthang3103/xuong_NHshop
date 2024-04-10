import express from "express";
import { connect } from "mongoose";
import productRouter from "./router/product";
import authRouter from "./router/auth";
import cartRouter from "./router/cart";
import orderRouter from "./router/order"
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan"

dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

(async() => {
    try {
        await connect(`mongodb://localhost:27017/thi-thu`);
    } catch (error) {
        console.log(error);
    }
})();

app.use(`/api`, productRouter)
app.use(`/api`, authRouter)
app.use('/api', cartRouter)
app.use('/api', orderRouter)

export const viteNodeApp = app;