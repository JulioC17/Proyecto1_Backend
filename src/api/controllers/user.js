const User = require("../models/user")//importamos el modelo USER
const bcrypt = require("bcrypt")//importamos bcrip para poder "leer" contrasenias encriptadas
const { generateSign } = require("../../utils/jwt")//importamos funcion para crear tokens
const deleteFile = require("../../config/deleteFile")//importamos funcion para eliminar archivos de cloudinary

const createUser = async (req, res, next) => {
    try {
        
        const userDuplicated = await User.findOne({email: req.body.email})//buscamos usuarios que ya posean un email igual al que se intenta agregar
        if(userDuplicated){
            return res.status(400).json("Este usuario ya existe")//error en caso de que exista
        }
        
        if(req.body.role === "admin"){//impedimos que un nuevo usuario se cree con el rol de "admin"
            return res.status(403).json({message: "No tienes permisos de Administrador"})
        }

        const user = new User(req.body)//creamos un nuevo USER en base a la info pasada mediante el body de la peticion
        
        if(req.file){
            user.image = req.file.path//subimos archivo en caso de que exista
        }
        const userSaved = await user.save()//guardamos la informacion en la base de datos
        return res.status(201).json({Message: "Usuario creado. con exito", User: userSaved})


    } catch (error) {
        return res.status(400).json("Error al crear un ususario nuevo")//capturamos cualquier error que pueda suceder
    }
}



const userLogin = async (req, res, next) => {
    try {
        const {email, password} = req.body//desestructuramos la info del body de la peticion para quedarnos con el email y el password
        const user = await User.findOne({email})//buscamos algun USER que tenga el mismo mail que se pasa en el body
        
        if(!user){
            return res.status(400).json("No. existe usuario con este correo")//si no existe se captura el error
        }

        if(bcrypt.compareSync(password, user.password)){//comparamos las contrasenia del body con la contrasenia del USER que tiene el mismo mail que se paso en el body
            const token = generateSign(user._id)//generamos el token en base al id
            return res.status(200).json({token, user})
        }else{
            return res.status(400).json("contrasenia incorrecta")//capturamos cualquier error que pueda suceder
        }
    } catch (error) {
        return res.status(400).json("Contraseña o usuario incorrecto")//capturamos cualquier error que pueda suceder
    }
}



const userView = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id)//busqueda de un usuario con el id que se le pase en los params de la peticion
        if(req.user.id == req.params.id || req.user.role == "admin"){//permitimos acceso si el id de los params es igual al id del token o si el role del propietario del token es "admin" 
        return res.status(200).json(user)//devolucion de los datos
        }else{
            return res.status(400).json("No estas autorizado")//capturamos error
        }
    } catch (error) {
        return res.status(400).json({message: "No podemos visualizar tu usuario"})//capturamos error
    }
}



const updateUser = async (req, res, next) => {
    try {
        const {id} = req.params//obtencion del id desd los mismos parametros de la peticions
        const duplicatedUser = await User.findOne({email: req.body.email})//busca un usuario que tenga el mismo mail que el que se le esta pasando en el body de la request
        const updates = { //campos permitidos para su modificacion
            name: req.body.name,
            email: req.body.email,
            image: req.body.image,
            role: req.body.role
        }
        if(req.body.role === "admin" && req.user.role !== "admin"){//comprobacion que la actulizacion del usuario no incluya una actualizacion del rol a ADMIN a menos que el token incluido venga de un "admin"
            return res.status(403).json("No tienes permisos para cambiar tu rol")
        }

        if(duplicatedUser && duplicatedUser._id.toString() !== id){//si el email nuevo es igual a otro existente saltara error
            return res.status(400).json("Este Email ya esta en uso")
        }

        if(req.user.id == id || req.user.role == "admin"){//permitimos acceso si el id de los params es igual al id del token, o si el role del propietario del token es "admin"
        const userUpdated = await User.findByIdAndUpdate(id, updates, {new: true})//actualizamos el user con el id desestructurado, y los parametros definidos
        return res.status(200).json(userUpdated)//devolucion del usuario incluyendo los datos modificados 
        }else{
            return res.status(403).json("no estas autorizado")//capturamos error
        }

    } catch (error) {
        return res. status(400).json("Error al Actualizar tu perfil")//capturamos error
    }

}

const userDelete = async (req, res, next) => {
    try {
        
        const {id} = req.params//desestructuramos los parametros de la peticion para quedarnos con el id
        if(req.user.id == id || req.user.role == "admin"){//permitimos acceso si el id de los params es igual al id del token o si el role del propietario del token es "admin"
        const userDeleted = await User.findByIdAndDelete(id)//eliminamos el usuario con el id recuperado

        deleteFile(userDeleted.image)//eliminamos la imagen del user eliminado de cloudinary
        return res.status(200).json({
            message:"Usuario eliminado con Exito",
            User: userDeleted
        })
    }else{
        return res.status(403).json("No estas autorizado")//capturamos los errores que puedan suceder
    }
        
    } catch (error) {
        return res.status(400).json("Error al intentar Eliminar tu usuario")//capturamos los errores que puedan suceder
    }
    
}

const adminView = async (req, res, next) => {
    try {
        if(req.user.role == "admin"){//verificamos el role del propietario del token y permitimos en caso de ser "admin"
           const users = await User.find()//recuperamos todos los USER
           return res.status(200).json(users)
        }else{
            return res.status(400).json("No estas autorizado")//capturamos cualquier error que pueda suceder
        }
    } catch (error) {
        return res.status(400).json("No se pueden visualizar todos los usuarios")//capturamos cualquier error que pueda suceder
    }
}

module.exports = {//exportacion de los controladores
    createUser,
    userLogin,
    userView,
    updateUser,
    userDelete,
    adminView
}