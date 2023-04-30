const jwt = require("jsonwebtoken")
const dotEnv = require("dotenv")

dotEnv.config()

// VALIDAR SESIÓN - COMPARAR TOKEN EN LA CABECERA
const jwt_check = (req, res, next) => {

    try{
        let headerRol = req.headers["rol"]

        if(headerRol == "user"){
            let headerJwt = req.headers["authorization"]
            let isJwt = jwt.verify(headerJwt, process.env.SECRET_JWT)
            next()
        }

        if(headerRol == "admin"){
            let headerJwt = req.headers["authorization"]
            let isJwt = jwt.verify(headerJwt, process.env.SECRET_JWT_ADMIN)
            next()
        }

        throw new Error("Error de roles")
    }
    catch{

        res.json({ "estado": false, "info": "token invalido" })
    }
}

module.exports = jwt_check