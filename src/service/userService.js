import bcrypt from 'bcryptjs';
import db from '../models/index.js';
import apiService from "./apiService.js";

const salt = bcrypt.genSaltSync(10);

const getAllUserService = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "phone", "email"],
            include: {
                model: db.Group,
                attributes: ["name", "description"]
            }
        });

        if (users) {
            return {
                EC: 0,
                EM: "Get API succeed",
                DT: users
            }
        } else {
            return {
                EC: 0,
                EM: "Get API succeed",
                DT: []
            }
        }

    } catch (e) {
        console.log(e);
        return {
            EC: -69,
            EM: "Oops, something wrong!"
        }
    }
}

const getUserPaginate = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.User.findAndCountAll({
            attributes: ['id', 'username', 'email', 'phone', 'address', 'sex'],
            include: [{
                model: db.Group,
                attributes: ["name", "description", "id"]
            }],
            order: [['id', 'DESC']],
            offset: offset,
            limit: limit
        })

        let totalPages = Math.ceil(count / limit);

        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }

        return {
            EC: 0,
            EM: "Get API success",
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

const createNewUserService = async (data) => {
    try {
        let isEmailExist = await apiService.checkEmailExist(data.email);
        let isPhoneExist = await apiService.checkPhoneExist(data.phone);

        if (isPhoneExist) {
            return {
                EM: "SĐT này đã được sử dụng",
                EC: -4,
                DT: 'phone'
            }
        }

        if (isEmailExist) {
            return {
                EM: "Email này đã được sử dụng",
                EC: -3,
                DT: 'email'
            }
        }

        const hashPassword = await bcrypt.hash(data.password, salt);

        await db.User.create({ ...data, password: hashPassword });
        return {
            EC: 0,
            EM: "Create success"
        }

    } catch (e) {
        console.log(e);
        return {
            EC: -69,
            EM: "Oops, something wrong!"
        }
    }

}

const updateUserService = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EC: -1,
                EM: "Empty groupId",
                DT: 'group'
            }
        }

        let user = await db.User.findOne(
            {
                where: {
                    id: data.id
                }
            }
        )

        if (user) {
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            })

            return {
                EC: 0,
                EM: "Update user success",
            }

        } else {
            return {
                EC: -2,
                EM: "User not found",
                DT: 'group'
            }
        }

    } catch (e) {
        console.log(e);
        return {
            EC: -69,
            EM: "Oops, something wrong!"
        }
    }

}

const deleteUserService = async (data) => {
    try {

        await db.User.destroy({
            where: {
                id: data.id
            }
        })

        return {
            EC: 0,
            EM: "Delete user succeed"
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
    getAllUserService, updateUserService,
    createNewUserService, deleteUserService,
    getUserPaginate
}