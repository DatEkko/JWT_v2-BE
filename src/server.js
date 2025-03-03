require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import bodyParser from "body-parser";
import connection from "./config/connectDB";
import configCORS from "./config/cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8888;

//config CORS
configCORS(app);

//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//config cookie-parser
app.use(cookieParser())

//test connection db
connection();

//init web routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
    console.log("Backend is running on port: " + PORT)
})