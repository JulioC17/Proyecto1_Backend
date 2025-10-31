const jwt = require("jsonwebtoken")//importamos la liberia que nos permitira leer y crear tokens

const generateSign = (id) => {
    return jwt.sign({id}, process.env.secretoJWT, {expiresIn: "30d"})//creamos el token en base al id del usuario, con el secreto y que expirara en 30 dias
}

const verifySign = (token) => {
    return jwt.verify(token, process.env.secretoJWT)//verificamos el token + secreto
}

module.exports = {//exportamos las funciones
    generateSign,
    verifySign
}