import db from '../models/index.js';

const getGroupService = async () => {
    try {
        let data = await db.Group.findAll({
            order: [['name', 'ASC']]
        });
        return {
            EC: 0,
            EM: "Get API Success",
            DT: data
        }

    } catch (e) {
        console.log(e);
        return {
            EC: -69,
            EM: "Oops, something wrong!"
        }
    }
}

module.exports = {
    getGroupService
}