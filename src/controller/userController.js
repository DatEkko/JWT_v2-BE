import userService from './../service/userService';

const handleCreate = async (req, res) => {
    try {
        let data = await userService.createNewUserService(req.body);
        return res.status(200).json(data)

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EC: -1,
            EC: "Error from server"
        })
    }
}

const handleRead = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;

            let data = await userService.getUserPaginate(+page, +limit);
            return res.status(200).json(data);

        } else {
            let data = await userService.getAllUserService();
            return res.status(200).json(data)
        }

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EC: -1,
            EC: "Error from server"
        })
    }
}

const handleUpdate = async (req, res) => {
    try {
        let data = await userService.updateUserService(req.body);
        return res.status(200).json(data)

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EC: -1,
            EC: "Error from server"
        })
    }
}

const handleDelete = async (req, res) => {
    try {

        let data = await userService.deleteUserService(req.body);
        return res.status(200).json(data)

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EC: -1,
            EC: "Error from server"
        })
    }
}

module.exports = {
    handleCreate, handleRead,
    handleUpdate, handleDelete
}