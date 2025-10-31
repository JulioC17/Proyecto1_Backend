const mongoose = require("mongoose")//importamos mongoose para poder rtabajr con mongo

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.url_mongo)//conectamos con mongo mediante la URL que es una variable de entorno
        console.log("✅ Conexion con la base de datos establecida correctamente")
    } catch (error) {
        console.log("Error en la conexion con la base de datos")//capoturamos cualquier error que pudiese ocurrir
    }
}

module.exports = {connectDB}//exportamos