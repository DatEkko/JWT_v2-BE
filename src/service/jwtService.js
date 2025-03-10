import { where } from 'sequelize/lib/sequelize';
import db from '../models/index.js';

const getGroupWithRoles = async (user) => {
    //scope
    let roles = await db.Group.findOne({
        where: {
            id: user.groupId
        },
        attributes: ['id', 'name', 'description'],
        include: {
            model: db.Role,
            attributes: ['id', 'url', 'description'],
            through: { attributes: [] }
        },
    })

    return roles ? roles : {}
}

module.exports = {
    getGroupWithRoles
}