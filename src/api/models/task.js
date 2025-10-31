const mongoose = require("mongoose")//importamos mongoose para trabajar con mongo

const taskSchema = new mongoose.Schema({//creamos la estrucutura que tendra nuestro modelo en la base de datos
    
    name:{type:String, required: true, trim: true},

    description:{type:String},

    user:{type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},//referencia al modelo con el que tendra relacion

    completed:{type: Boolean, default: false }

},{
    timestamps:true
})

const Task = mongoose.model("tasks", taskSchema, "tasks")//creamos el modelo a partir del SCHEMA y lo asociamos a la coleccion que declaramos

module.exports = Task //exportamos