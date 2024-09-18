import express from "express";
import mongoose from "mongoose";
import router from "./router/employeeRouters.js";
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);
const PORT = 8081;

mongoose.connect("mongodb://localhost:27017/employees")
    .then(() => {
        console.log("Db Connected");
    }).catch(() => {
        console.log("Db Not Connected")
    }).finally(() => {
        console.log("Connection Attempt Finished!");
    })

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server Running at: ${PORT}`);
    }
})