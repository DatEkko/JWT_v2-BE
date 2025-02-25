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
    router.post("/users/create-user", backendController.createNewUser);
    router.post("/delete-user/:id", backendController.handleDeleteUser);
    router.post("/update-user/:id", backendController.getUpdateUserPage);
    router.post("/users/update-user/:id", backendController.handleUpdateUser);

    return app.use("/", router)
}

export default initWebRoutes;