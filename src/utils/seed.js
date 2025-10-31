const mongoose = require("mongoose")//importamos mongoose para poder conectarnos y trabajar con mongo
const dotenv = require("dotenv").config()//importacion de dotenv.config para poder usar variables de entorno
const User = require("../api/models/user")//importamos el modelo de USER
const Task = require("../api/models/task")//importamos el modelo de TASk
const userSeed = require("../data/userSeed")//importamos los datos de la semilla de USER
const taskSeed = require("../data/taskSeed")//importamos los datos de la semilla de TASK

const insertSeeds = async () => {

    try {
        await mongoose.connect(process.env.url_mongo)//conectamos a mongo

        await User.collection.deleteMany({})//eliminamos todos los datos de la coleccion USER sin eliminar la coleccion en si misma
        console.log("Datos de la coleccion User elimnada")
        await Task.collection.deleteMany({})////eliminamos todos los datos de la coleccion TASK sin eliminar la coleccion en si misma
        console.log("Datos de la coleccion Task elimnada")

        await User.insertMany(userSeed)//usamos los datos de la semilla y se los inyectammos a la coleccion
        console.log("Usuarios de prueba agregados correctamente")

        const userArray = await User.find()//recuperamos todos los objetos de la coleccion USER
        
         for (const user of userArray) {//recorremos y recuperamos 1 a 1 los objetos de la coleccion USER
            
            for (const task of taskSeed) {//recorremos y recuperamos 1 a 1 los objetos de la coleccion TASK
                
                const newTask = await Task.create({//creamos una nueva tarea a caada usuario
                    ...task,
                    user: user._id
                })

                const taskUpdated = await User.findByIdAndUpdate(//buscamos cada usuario y le inyectamos cada tarea a cada usuario
                    user.id,
                    {$push: {task: newTask._id}}
                )
            }
         }
         console.log("Tareas de prueba agregadas correctamente")
        
        await mongoose.disconnect()//desconectamos mongoose

    } catch (error) {
        console.log("Error en la insercion de la semilla", error)//atrapamos cualquier error que pueda ocurrir
    }
}

insertSeeds()//llamamos a la funcion