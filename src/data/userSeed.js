const bcrypt = require("bcrypt")//importamos bcrypt para poder encriptar las contrasenias

const hashPassword = bcrypt.hashSync("12345", 10)//hasheamos esta contrasenia que por defecto traera la semilla para poder trabajar con ellas


const userSeed = [
    {
        name: "Julio",
        password: hashPassword,
        email: "julio@gmail.com",
        image:"Url/laqueyoquiera",
        role: "admin"
    },
    {
    name: "Usuario1",
    password: hashPassword,
    email: "usuario1@gmail.com",
    image: "https://via.placeholder.com/150",
    role: "user"
  },
  {
    name: "Usuario2",
    password: hashPassword,
    email: "usuario2@gmail.com",
    image: "https://via.placeholder.com/150",
    role: "user"
  },
  {
    name: "Usuario3",
    password: hashPassword,
    email: "usuario3@gmail.com",
    image: "https://via.placeholder.com/150",
    role: "user"
  },
  {
    name: "Usuario4",
    password: hashPassword,
    email: "usuario4@gmail.com",
    image: "https://via.placeholder.com/150",
    role: "user"
  },
  {
    name: "Usuario5",
    password: hashPassword,
    email: "usuario5@gmail.com",
    image: "https://via.placeholder.com/150",
    role: "user"
  },
  {
    name: "Usuario6",
    password: hashPassword,
    email: "usuario6@gmail.com",
    image: "https://via.placeholder.com/150",
    role: "user"
  },
  {
    name: "Usuario7",
    password: hashPassword,
    email: "usuario7@gmail.com",
    image: "https://via.placeholder.com/150",
    role: "user"
  },
  {
    name: "Usuario8",
    password: hashPassword,
    email: "usuario8@gmail.com",
    image: "https://via.placeholder.com/150",
    role: "user"
  },
  {
    name: "Usuario9",
    password: hashPassword,
    email: "usuario9@gmail.com",
    image: "https://via.placeholder.com/150",
    role: "user"
  },
  {
    name: "Usuario10",
    password: hashPassword,
    email: "usuario10@gmail.com",
    image: "https://via.placeholder.com/150",
    role: "user"
  },
  {
    name: "Usuario11",
    password: hashPassword,
    email: "usuario11@gmail.com",
    image: "https://via.placeholder.com/150",
    role: "user"
  },
  {
    name: "Usuario12",
    password: hashPassword,
    email: "usuario12@gmail.com",
    image: "https://via.placeholder.com/150",
    role: "user"
  },
  {
    name: "Usuario13",
    password: hashPassword,
    email: "usuario13@gmail.com",
    image: "https://via.placeholder.com/150",
    role: "user"
  },
  {
    name: "Usuario14",
    password: hashPassword,
    email: "usuario14@gmail.com",
    image: "https://via.placeholder.com/150",
    role: "user"
  }   
]

module.exports = userSeed//exportamos