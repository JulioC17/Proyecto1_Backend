const cloudinary = require("cloudinary").v2//importamos cloudinary

const deleteFile = (url) => {//funcion para eliminar archivos de cloudinary
    const array = url.split("/")//guardamos en un array la URL que pasemos por parametro, y los elemntos seran cada STRING que este antes o despues de "/"
    
    const folder = array.at(-1).split(".")[0]//recuperamos el ultimo elemnto del array anterior(que deberia ser el archivo guardado), guardamos su contenido en un array cuyos elementos seran STRING que antes o despues tuviesen "." y nos quedamos con el primer elemento de este array(deberia ser el nombre del archivo sin extension)
    
    let public_id = `${array.at(-2)}/${folder}`//usamos el id que nos pide cloudinary que es(carpeta de archivo/nombre de archivo) para poder eliminarlo

    cloudinary.uploader.destroy(public_id, () => {//eliminamos el archivo
        console.log("Imagen Eliminada correctamente")
    })
}

module.exports = deleteFile//exportamos
