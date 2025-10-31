const Task = require("../models/task")//importamos el modelo TASK
const User = require("../models/user")//importamos el modelo USER

const createTask = async (req, res, next) => {
try {
    const idToken = req.user.id//recuperamos el id del token
    const idRoute = req.params.id//recuperamos el id de los params
    
    if(idToken === idRoute || req.user.role == "admin"){//permitimos acceso si el id de los params coincide con el id del token o si el rol del propietario del token es "admin"
    const newTask = new Task({//creamos nueva tarea
        ...req.body,//agregamos toda la informacion que venga del body
        user: idRoute//id del USER al que se le asignara la tarea
        
    })
    const savedTask = await newTask.save()//guardamos la tarea en la base de datos
    
    const userTaskUpdated = await User.findByIdAndUpdate(idRoute, //actualizamos mediante push por la futuras tareas que pudieran agregarse, para no borrar las que ya estuviesen incluidas
        {$push: {task: savedTask._id}},
        {new: true}
    )

    return res.status(200).json(userTaskUpdated)
    
    }else{
        return res.status(403).json("No estas autorizado")//capturamos cualquier error que puediera darse
    }

    
} catch (error) {
    return res.status(400).json("No podemos insertar la nueva tarea")//capturamos cualquier error que pudise suceder
}
}

const viewTask = async (req, res, next) => {
    try{

        const idToken = req.user.id//recuperamos id del token
        const idRoute = req.params.id//recuperamos id de los params
        
        if(idToken === idRoute || req.user.role == "admin"){//permitimos acceso si el id de los params coincide con el id del token o si el rol del propietario del token es "admin"

        const tasks = await User.findById(idRoute).populate("task")//buscamos las tareas del usuario, y lo populamos con task para poder trabajar con ellas
        
        return res.status(200).json({
            Name: tasks.name,//recuperamos el nombre del propietario de las traeas
            tasks: tasks.task.map(tarea =>({//hacemos un recorrido del array de TASK para poder mostrar el nombre y su descripcion de cada una de las tareas y no solo su id
                Name: tarea.name,
                Description: tarea.description
            }))
        })
        }else{
            return res.status(403).json("No estas autorizado")//capturamos cualquier error
        }
    
    }catch(error){
        console.log(error)
        return res.status(400).json("Error para ver tus tareas")//capturamos cualquier error que pueda haber ocurrido
        
    }

}

const deleteTask = async (req, res, next) => {
    
    try{
    
        const id = req.user.id//recuperamos id del token
        const task = await Task.findById(req.params.id)//recuperamos el id de la tarea
        const userId = task.user//recuperamos el id del USER propieatario de la tarea

        if(!task){
            return res.status(404).json("Tarea no encontrada")//lanzamos error si no existe la tarea
        }
    
        if(task.user.toString() !== id && req.user.role !== "admin"){//lanzamos error si el id del USER de la tarea es diferente al id del token o si el role del propietario del token es diferente a "admin" 
        return res.status(403).json("No tienes permisos para eliminar la tarea")
        }

        await task.deleteOne()//eliminamos la tarea de la coleccion TASK

        await User.findByIdAndUpdate(userId, {$pull:{task: task._id}}, {new: true})//actualizamos la coleccion de id's de TASK del USER 

        return res.status(200).json({
            Message: "Tarea Eliminada correctamente",
            Task: task
        })

    }catch(error){
        
        return res.status(400).json("No se puede eliminar tu tarea")//capturamos cualquier error que pudiese suceder
    }
}

module.exports = {//exportamos los controladores
    createTask,
    viewTask,
    deleteTask
}