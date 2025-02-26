require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import connection from "./config/connectDB";

const app = express();
const PORT = process.env.PORT || 8888;

//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//test connection db
connection();

//init web routes
initWebRoutes(app);

app.listen(PORT, () => {
    console.log("Backend is running on port: " + PORT)
})