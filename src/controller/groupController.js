import groupController from './../service/groupService';

const handleRead = async (req, res) => {
    try {
        let data = await groupController.getGroupService();
        return res.status(200).json(data);

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EC: -1,
            EC: "Error from server"
        })
    }
}

module.exports = {
    handleRead
}