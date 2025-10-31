const cloudinary = require("cloudinary").v2//importamos cloudinary

const connectCloudinary = () => {
    try {
        cloudinary.config({//configuramos cloudinary y conectamos con el mediante el nombre de la CLOUD, la API KEY y la API SECRET(variables de entorno en este caso)
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET            

        })
        console.log("✅ Conexion con Cloudinary exitosa ")
    } catch (error) {
        console.log("❌ Conexion fallida con Cloudinary ")//capturamos cualquier error que pueda suceder
    }
}

module.exports = {connectCloudinary}//exportamos