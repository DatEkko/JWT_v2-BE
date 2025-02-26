import bcrypt from 'bcryptjs';
import db from '../models/index.js'

const salt = bcrypt.genSaltSync(10);

const createNewUserService = async (email, password, username) => {
    try {
        const hashPassword = bcrypt.hashSync(password, salt);
        await db.User.create(
            {
                email: email,
                password: hashPassword,
                username: username
            }
        )

    } catch (e) {
        return (console.log(e))
    }
}

const getUserListService = async () => {
    try {
        let users = await db.User.findAll();
        return users;

    } catch (e) {
        return (console.log(e))
    }
}

const deleteUserService = async (userId) => {
    try {
        await db.User.destroy({
            where: {
                id: userId
            }
        });

    } catch (e) {
        return (console.log(e))
    }
}

const getUserById = async (userId) => {
    try {
        let user = await db.User.findOne({
            where: {
                id: userId,
            },
        })

        return user.get({ plain: true });

    } catch (e) {
        return (console.log(e))
    }
}

const updateUserInfoService = async (userId, email, username) => {
    try {
        await db.User.update(
            {
                email: email,
                username: username
            },
            {
                where: {
                    id: userId
                }
            })

    } catch (e) {
        return (console.log(e))
    }
}

module.exports = {
    createNewUserService, getUserListService,
    deleteUserService, getUserById, updateUserInfoService
}