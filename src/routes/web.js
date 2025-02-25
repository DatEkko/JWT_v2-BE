import express from "express";
import backendController from "./../controller/backendController"

const router = express.Router();

/**
 * 
 * @param {*} app 
 */
const initWebRoutes = (app) => {
    router.get("/", backendController.handleHomepage);
    router.get("/users", backendController.handleUsePage);
    router.post("/users/create-user", backendController.createNewUser)


    return app.use("/", router)
}

export default initWebRoutes;