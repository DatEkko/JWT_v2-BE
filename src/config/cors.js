require("dotenv").config();

const configCORS = (app) => {
    app.use(function (req, res, next) {
        res.header(`Access-Control-Allow-Origin`, process.env.REACT_URL);
        res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
        res.header(`Access-Control-Allow-Headers`, `X-Requested-With, Content-Type`);
        res.header(`Access-Control-Allow-Credentials`, true);
        next();
    })
}

export default configCORS;