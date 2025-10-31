const mongoose = require("mongoose")//importamos libreria de mongoose para poder trabajr con mongo
const bcrypt = require("bcrypt")//importamos bcrypt para poder encriptar contenido, en este caso contrasenias


const userSchema = new mongoose.Schema({//creamos la estructura que usaremos en el modelo de la base de datos

    name:{type: String, required: true, trim: true},

    password:{type: String, required:  true},

    email:{type: String, required: true, trim: true, unique: true},

    image:{type: String, required: true},

    role:{type: String, enum:["admin", "user"], default: "user"},//roles que un usuario podra tener, en este caso siempre se creara por defecto "user"

    task:[{type: mongoose.Schema.Types.ObjectId, ref: "tasks"}]//referencia al modelo con el que tendra relacion este propio modelo

},{
    timestamps: true
})

userSchema.pre("save",  function () {
    this.password = bcrypt.hashSync(this.password,10)//hasheamos la contrasenia antes de que se guarde definitavemnt en la base de datos
})

const User = mongoose.model("users", userSchema, "users")//creamos modelo a partir del SCHEMA y lo asociamos coleccion declarada

module.exports = User//exportamos