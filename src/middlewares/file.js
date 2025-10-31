const cloudinary = require("cloudinary").v2//importamos la libreria de cloudinary
const multer = require("multer")//importamos multer
const {CloudinaryStorage} = require("multer-storage-cloudinary")//desestructuramos multer-setorage-cloudinary para quedarnos solo con cloudinary storage

const storage = new CloudinaryStorage({//creamos una nueva instancia de cloudinary storage
    cloudinary: cloudinary,
    params:{
        folder: "ProyectoBackend",//carpeta donde se guardara el archivo subido
        allowedFormats: ["jpg", "jpeg", "png", "gif", "webp"]//formatos permitidos
    }
})

const upload = multer({storage}) //almacen con datos que tenia la funcion anterior
module.exports = upload//exportamos
