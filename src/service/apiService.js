require('dotenv').config();
import bcrypt from 'bcryptjs';
import db from '../models/index.js';
import { Op } from 'sequelize';
import { getGroupWithRoles } from "./jwtService.js";
import JWTActions from "./../middleware/JWTActions.js";

const salt = bcrypt.genSaltSync(10);

const checkEmailExist = async (email) => {
    let user = await db.User.findOne({
        where: {
            email: email
        }
    })

    if (user) {
        return true;
    }

    return false;
}

const checkPhoneExist = async (phone) => {
    let user = await db.User.findOne({
        where: {
            phone: phone
        }
    })

    if (user) {
        return true;
    }

    return false;
}

const handleRegisterService = async (data) => {
    try {
        //validate data
        if (!data.email || !data.phone || !data.password) {
            return ({
                EM: "Missing required value",
                EC: -2
            })
        }

        let isEmailExist = await checkEmailExist(data.email);
        let isPhoneExist = await checkPhoneExist(data.phone);

        if (isPhoneExist) {
            return {
                EM: "SĐT này đã được sử dụng",
                EC: -4
            }
        }

        if (isEmailExist) {
            return {
                EM: "Email này đã được sử dụng",
                EC: -3
            }
        }
        //hash password
        const hashPassword = await bcrypt.hash(data.password, salt);

        await db.User.create({
            email: data.email,
            username: data.username,
            password: hashPassword,
            phone: data.phone,
            groupId: 4
        })

        return ({
            EM: "Đăng ký tài khoản thành công",
            EC: 0
        })

    } catch (e) {
        console.log(e);
        return {
            EM: "Oops, something wrong",
            EC: -5
        }
    }
}

const handleLoginService = async (data) => {
    try {
        //validate data
        if (!data.valueLogin || !data.password) {
            return ({
                EM: "Missing required value",
                EC: -2
            })
        }

        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: data.valueLogin },
                    { phone: data.valueLogin }
                ]
            }
        })

        if (user) {
            let checkPassword = await bcrypt.compare(data.password, user.password);
            if (checkPassword) {

                let groupWithRoles = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    groupWithRoles,
                }
                let token = JWTActions.createJWT(payload);
                return {
                    EM: "Đăng nhập thành công",
                    EC: 0,
                    DT: {
                        email: user.email,
                        username: user.username,
                        access_token: token,
                        groupWithRoles
                    }
                }
            }
        }

        return {
            EM: "Sai tên đăng nhập hoặc mật khẩu",
            EC: -1
        }


    } catch (e) {
        console.log(e);
        return {
            EM: "Oops, something wrong",
            EC: -5
        }
    }
}

module.exports = {
    handleRegisterService, handleLoginService,
    checkEmailExist, checkPhoneExist
}