import express from 'express';
import product from "./routes/productRoutes.js"
import user from "./routes/userRoutes.js"
import errorHandleMiddleware from "./middleware/error.js"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();

// middleware
app.use(fileUpload());

// UPDATE THESE TWO LINES: Increase the limit to handle base64 image strings
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());

// route
app.use("/api/v1", product)
app.use("/api/v1", user)

app.use(errorHandleMiddleware);

export default app;