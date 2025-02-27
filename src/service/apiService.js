import bcrypt from 'bcryptjs';
import db from '../models/index.js';
import { where } from 'sequelize/lib/sequelize';

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

        if (isEmailExist) {
            return {
                EM: "Email already use",
                EC: -3
            }
        }

        if (isPhoneExist) {
            return {
                EM: "Phone number already use",
                EC: -4
            }
        }

        //hash password
        const hashPassword = await bcrypt.hash(data.password, salt);

        await db.User.create({
            email: data.email,
            username: data.username,
            password: hashPassword,
            phone: data.phone
        })

        return ({
            EM: "Register succeed",
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

module.exports = {
    handleRegisterService
}