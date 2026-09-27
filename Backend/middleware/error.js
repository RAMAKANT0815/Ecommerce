import HandleError from "../utils/handleError.js";

export default (err, req, res, next) => {
    // ADD THE LOG RIGHT HERE
    console.log("🔥 FULL BACKEND ERROR:", err);

    err.statusCode = err.statusCode || 500;
    err.HandleError = err.HandleError || "Internal Server Error";


    //casting error for wrong id
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new HandleError(message, 400);
    }
    //duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new HandleError(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    })

}