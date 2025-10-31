const Task = require("../models/task")
const User = require("../models/user")

const createTask = async (req, res, next) => {
try {
    const idToken = req.user.id
    const idRoute = req.params.id
    
    if(idToken === idRoute || req.user.role == "admin"){
    const newTask = new Task({
        ...req.body,
        user: idRoute
        
    })
    const savedTask = await newTask.save()
    
    const userTaskUpdated = await User.findByIdAndUpdate(idRoute, 
        {$push: {task: savedTask._id}},
        {new: true}
    )

    return res.status(200).json(userTaskUpdated)
    
    }else{
        return res.status(403).json("No estas autorizado")
    }

    
} catch (error) {
    return res.status(400).json("No podemos insertar la nueva tarea")
}
}

const viewTask = async (req, res, next) => {
    try{

        const idToken = req.user.id
        const idRoute = req.params.id
        
        if(idToken === idRoute || req.user.role == "admin"){

        const tasks = await User.findById(idRoute).populate("task")
        
        return res.status(200).json({
            Name: tasks.name,
            tasks: tasks.task.map(tarea =>({
                Name: tarea.name,
                Description: tarea.description
            }))
        })
        }else{
            return res.status(403).json("No estas autorizado")
        }
    
    }catch(error){
        console.log(error)
        return res.status(400).json("Error para ver tus tareas")
        
    }

}

const deleteTask = async (req, res, next) => {
    
    try{
    
        const id = req.user.id 
        const task = await Task.findById(req.params.id)
        const userId = task.user

        if(!task){
            return res.status(404).json("Tarea no encontrada")
        }
    
        if(task.user.toString() !== id && req.user.role !== "admin"){
        return res.status(403).json("No tienes permisos para eliminar la tarea")
        }

        await task.deleteOne()

        await User.findByIdAndUpdate(userId, {$pull:{task: task._id}}, {new: true}) 

        return res.status(200).json({
            Message: "Tarea Eliminada correctamente",
            Task: task
        })

    }catch(error){
        
        return res.status(400).json("No se puede eliminar tu tarea")
    }
}

module.exports = {
    createTask,
    viewTask,
    deleteTask
}