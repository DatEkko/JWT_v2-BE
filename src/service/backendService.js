import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';

const salt = bcrypt.genSaltSync(10);

const createNewUserService = async (email, password, username) => {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "jwt",
            Promise: bluebird
        })

        const hashPassword = bcrypt.hashSync(password, salt);
        await connection.execute(`INSERT INTO users (email, password, username) VALUES (?, ?, ?)`, [email, hashPassword, username]);

    } catch (e) {
        return (console.log(e))
    }
}

const getUserListService = async () => {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "jwt",
            Promise: bluebird
        })

        const [rows] = await connection.execute(`SELECT * FROM users`);
        return rows

    } catch (e) {
        return (console.log(e))
    }
}

const deleteUserService = async (id) => {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "jwt",
            Promise: bluebird
        })

        await connection.execute(`DELETE FROM users WHERE id=?`, [id]);

    } catch (e) {
        return (console.log(e))
    }
}

const getUserById = async (id) => {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "jwt",
            Promise: bluebird
        })

        const [rows] = await connection.execute(`SELECT * FROM users WHERE id=?`, [id]);
        return rows

    } catch (e) {
        return (console.log(e))
    }
}

const updateUserInfoService = async (id, email, username) => {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "jwt",
            Promise: bluebird
        })

        await connection.execute(`UPDATE users SET email = ?, username = ? WHERE id = ?`, [email, username, id]);

    } catch (e) {
        return (console.log(e))
    }
}

module.exports = {
    createNewUserService, getUserListService,
    deleteUserService, getUserById, updateUserInfoService
}