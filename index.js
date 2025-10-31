const express = require("express")//importacion de express
const dotenv = require("dotenv").config()//importacion de dotenv.config para poder usar variables de entorno
const { connectDB } = require("./src/config/connectDB")//importacion de la funcion de conexion a la base de datos
const userRouter = require("./src/api/routes/user")//importacion del router con las rutas de USER
const taskRouter = require("./src/api/routes/task")//importacion del router con las rutas de TASK
const { connectCloudinary } = require("./src/config/cloudinary")//importacion de la funcion de conexion a cloudinary

const app = express()//creamos la instancia de express
const PORT = process.env.PORT//importacion de la variable de entorno que contien el puerto de trabajo

connectDB()//conectamos con mongo
connectCloudinary()//conectamos con cloudionary


app.use(express.json())//leemos el body de las peticiones en formatoJSON para convertirlas en un objeto


app.use("/api/v1/user", userRouter)//rutas de USER
app.use("/api/v1/task", taskRouter)//rutas de TASK
app.use((req, res) => {//ruta no definida
    return res.status(404).json({
        error: "Parece que no hay nada interesante en este sitio."
    })
})

app.listen(PORT, () => {//arrancamos el servidor y nos quedamos a la espera de peticiones
    console.log(`✅ Servidor Arrancado en el puerto ${PORT}`)
})

