# Proyecto 1 Backend

## Descripción  
Este proyecto proporciona una API REST desarrollada con **Node.js**, **Express** y **MongoDB**, que gestiona usuarios y tareas con autenticación (`JWT`), subida de imágenes a Cloudinary y lógica de roles ("user" vs "admin").

---

## Tecnologías utilizadas  
- Node.js  
- Express  
- MongoDB con Mongoose  
- JSON Web Token (JWT)  
- Cloudinary (almacenamiento de imágenes)  
- Multer + multer‑storage‑cloudinary (para procesar subida de ficheros)  
- dotenv (gestión de variables de entorno)

---

## Funcionalidades principales  
- Registro de usuarios (rol por defecto: *user*)  
- Login de usuarios mediante email y contraseña  
- Roles de usuario: *user* / *admin*  
- Usuarios *user* pueden ver, actualizar o eliminar su propia cuenta y sus propias tareas  
- Usuarios *admin* pueden ver todos los usuarios, cambiar roles, eliminar cualquier usuario  
- Gestión de tareas ⬅ cada usuario puede crear, ver, eliminar sus tareas; los admins pueden también  
- Subida de imagen de perfil de usuario mediante multipart/form-data y Cloudinary  
- Semilla de datos para poblar usuarios y tareas de desarrollo

---

## Instalación y configuración  

1. Clona el repositorio:  
   ```bash
   git clone https://github.com/JulioC17/Proyecto1_Backend.git
   cd Proyecto1_Backend.

2. Instalar dependencias: npm install

3. Arrancar servidor en modo desarrollo: npm run dev

---

## Uso / Ejemplos de peticiones

# Registro de usuario
POST /api/v1/user/register
	•	En Body (multipart/form-data):
	•	name: cadena
	•	email: cadena
	•	password: cadena
	•	image: (archivo de imagen)

# Login de usuario
POST /api/v1/user/login
	•	Body (JSON):
    • {"email": "usuario@example.com","password": "12345"}
    •	Respuesta: token JWT + datos del usuario.

# Ver usuario propio o como admin
GET /api/v1/user/:id
	•	Header Authorization: Bearer <token> obligatorio
	•	Un user solo puede ver su propio id; un admin puede ver cualquier usuario.

# Actualizar usuario
PUT /api/v1/user/:id
	•	Header Authorization: Bearer <token>
	•	Body (JSON): name, email, image (opcional)
	•	Un user solo puede actualizar su propio perfil; un admin puede actualizar cualquier perfil e incluso cambiar el rol.

# Eliminar usuario
DELETE /api/v1/user/:id
	•	Header Authorization: Bearer <token>
	•	Un user solo puede borrarse a sí mismo; un admin puede borrar cualquier usuario.

# Gestión de tareas
	•   GET /api/v1/task/:id → Ver tareas del usuario :id
	•	POST /api/v1/task → Crear tarea (el user se toma del token o :id en ruta)
	•	DELETE /api/v1/task/:id → Eliminar tarea por :id
Un usuario puede borrar sus propias tareas, un admin puede borrar tareas de cualquier usuario.



## Semilla de datos (Seed)
Se incluye un script para eliminar colecciones y añadir usuarios de prueba (15 users + 1 admin) y tareas relacionadas. Úsalo solo en entorno de desarrollo.







## Autor
Julio C. Reyes — GitHub: JulioC17￼
Proyecto realizado como ejercicio académico y de práctica profesional.

