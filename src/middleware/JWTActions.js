require('dotenv').config();
import jwt from "jsonwebtoken";

const nonSerurePath = ['/', '/register', '/login'];

const createJWT = (payload) => {
    let token = null
    try {
        token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRED });
    } catch (e) {
        console.log(e)
    }

    return token
}

const verifyToken = (token) => {
    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        console.log(e)
    }

    return decoded
}

const checkJWTToken = (req, res, next) => {
    if (nonSerurePath.includes(req.path)) return next();
    let cookie = req.cookies;
    if (cookie && cookie.jwt) {
        let token = cookie.jwt;
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({
                EC: -2,
                EM: 'Not authenticated'
            })
        }

    } else {
        return res.status(401).json({
            EC: -1,
            EM: 'Not authenticated'
        })
    }
}

const checkUserPermisson = (req, res, next) => {
    if (nonSerurePath.includes(req.path)) return next();
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.groupWithRoles.Roles;
        let currentUrl = req.path;

        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -2,
                EM: `You don't have permisson to do this`
            })
        }

        let canAccess = roles.some(item => item.url === currentUrl);
        if (canAccess === true) {
            next();

        } else {
            return res.status(403).json({
                EC: -3,
                EM: `You don't have permisson to do this`
            })
        }

    } else {
        return res.status(401).json({
            EC: -1,
            EM: 'Not authenticated'
        })
    }
}

module.exports = {
    createJWT, verifyToken,
    checkJWTToken, checkUserPermisson
}