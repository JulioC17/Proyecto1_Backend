const User = require("../api/models/user")//importamos el modelo USER
const { verifySign } = require("../utils/jwt")//importamos funcion que nos permite verificar el token

const isAuth = async (req, res, next) => {
    try {
        const [, token] = req.headers.authorization.split(" ")//desestructuramos el token separando el "bearer", del token en si mismo y poder trabajar con el
        
        const {id} = verifySign(token)//desestructuramos la verificacion del token quedandonos con el id
        const user = await User.findById(id)//buscamos el USER mediante su id

        req.user = user// guardamos el usuario autenticado en la petición para usarlo cuando necesitemos
        
        next()
    } catch (error) {
        return res.status(400).json("No estas autorizado")//capturamos cualquier error que pudiese ocurrir
    }
}

module.exports = isAuth//exportamos