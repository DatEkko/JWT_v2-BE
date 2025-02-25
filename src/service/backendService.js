import mysql from 'mysql2';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt"
})

const createNewUserService = (email, password, username) => {
    try {
        const hashPassword = bcrypt.hashSync(password, salt);
        connection.query(
            `INSERT INTO users (email, password, username) VALUES (?, ?, ?)`, [email, hashPassword, username],
            function (err, results, fields) {
                if (err) {
                    console.log(err)
                }
            }
        )

    } catch (e) {
        return (console.log(e))
    }
}

const getUserList = () => {
    try {
        let users = [];

        connection.query(
            `SELECT * FROM users`,
            function (err, results, fields) {
                if (err) {
                    console.log(err)
                }

                if (results) {
                    users.push(results);
                    return ({
                        users
                    })
                }
            }
        )
    } catch (e) {
        return (console.log(e))
    }
}

module.exports = {
    createNewUserService, getUserList
}