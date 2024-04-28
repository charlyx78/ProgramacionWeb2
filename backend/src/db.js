import mongoose from "mongoose";

/** CREA UN ARCHIVO .ENV EN LA RAIZ DE LA CARPETA BACKEND Y GENERA
 * VARIABLE DE ENTORNO CON EL NOMBRE DB_URL ASIGNANDO EL VALOR DE
 * LA CONEXION DE TU MONGODB
 */
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("DB connected!" )
    } catch(error) {
        console.log(error)
    }
}