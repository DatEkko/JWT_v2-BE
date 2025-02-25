import backendService from './../service/backendService';

const handleHomepage = (req, res) => {
    return res.render("home.ejs")
}

const handleUsePage = async (req, res) => {
    let userList = await backendService.getUserListService();
    return res.render("userPage.ejs", { userList })
}

const createNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    backendService.createNewUserService(email, password, username);

    return res.redirect("/users");
}

const handleDeleteUser = async (req, res) => {
    await backendService.deleteUserService(req.params.id);
    return res.redirect("/users");
}

const getUpdateUserPage = async (req, res) => {
    let user = await backendService.getUserById(req.params.id);
    let userData = {}
    if (user && user.length > 0) {
        userData = user[0]
    }
    return res.render("editUserPage.ejs", { userData });
}

const handleUpdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;

    await backendService.updateUserInfoService(req.params.id, email, username);

    return res.redirect("/users");
}

module.exports = {
    handleHomepage, handleUsePage, createNewUser,
    handleDeleteUser, getUpdateUserPage, handleUpdateUser
}