import apiService from "./../service/apiService";

const handleRegister = async (req, res) => {
    try {
        let data = await apiService.handleRegisterService(req.body);

        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'Error from server',
            EC: -1
        })
    }
}

const handleLogin = async (req, res) => {
    try {
        let data = await apiService.handleLoginService(req.body);
        //set cookie
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
        }

        return res.status(200).json(data);

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'Error from server',
            EC: -1
        })
    }
}

module.exports = {
    handleRegister, handleLogin
}