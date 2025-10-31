const isAuth = require("../../middlewares/isAuth")//importamos la funcion de autenticacion
const {createTask, viewTask, deleteTask}  = require("../controllers/task")//importamos los controladores de TASK

const taskRouter = require("express").Router()//instaciamos el router de express

taskRouter.get("/:id", isAuth, viewTask)//ruta para que un usuario(o "admin") pueda ver sus tareas

taskRouter.post("/:id",isAuth ,createTask)//ruta para que un usuario(o "admin") pueda crear nuevas tareas

taskRouter.delete("/:id", isAuth, deleteTask)//ruta para que un usuario(o "admin") pueda eliminar tareas


module.exports = taskRouter//exportamos router