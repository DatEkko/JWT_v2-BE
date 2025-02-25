import backendService from './../service/backendService';

const handleHomepage = (req, res) => {
    return res.render("home.ejs")
}

const handleUsePage = (req, res) => {
    return res.render("userPage.ejs")
}

const createNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    backendService.createNewUserService(email, password, username);

    return res.send("Send nude")
}

module.exports = {
    handleHomepage, handleUsePage, createNewUser
}