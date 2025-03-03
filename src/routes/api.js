import express from "express";
import apiController from "./../controller/apiController";
import userController from "./../controller/userController";
import groupController from "./../controller/groupController";
import { checkJWTToken, checkUserPermisson } from "./../middleware/JWTActions";

const router = express.Router();

/**
 * 
 * @param {*} app 
 */

const initApiRoutes = (app) => {

    router.all("*", checkJWTToken, checkUserPermisson);

    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    router.post("/users/create", userController.handleCreate);
    router.get("/users/read", userController.handleRead);
    router.put("/users/update", userController.handleUpdate);
    router.delete("/users/delete", userController.handleDelete);

    router.get("/group/read", groupController.handleRead);

    return app.use("/api/v1", router)
}

export default initApiRoutes;