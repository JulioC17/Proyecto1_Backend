const upload = require("../../middlewares/file")//importamos la funcion para subir archiuvos con cloudinary
const isAuth = require("../../middlewares/isAuth")//importamos funcion de autenticacion
const {createUser, userView, updateUser, userDelete, userLogin, adminView} = require("../controllers/user")//importamos los controladores para estas rutas

const userRouter = require("express").Router()//instanciamos el router de express

userRouter.get("/admin/getAll", isAuth, adminView)//ruta para la visualizacion de todos los usuarios que solo pueden hacer usuarios con el role de "admin"
userRouter.get("/:id", isAuth ,userView)//ruta para que un usuario(o "admin") pueda ver su propia informacion

userRouter.post("/register", upload.single("image"),createUser)//ruta para la creacion de un nuevo usuario
userRouter.post("/login", userLogin)//ruta para hacer el login de un usuario


userRouter.put("/:id", isAuth ,updateUser)//ruta para que un usuario(o "admin") pueda actualizar su perfil

userRouter.delete("/:id", isAuth ,userDelete)//ruta para que un usuario(o "admin") pueda eliminar su perfil


module.exports = userRouter//exportamos el router
