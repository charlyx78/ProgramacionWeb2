import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";

/** CREA UN ARCHIVO .ENV EN LA RAIZ DE LA CARPETA BACKEND Y GENERA
 * VARIABLE DE ENTORNO CON EL NOMBRE DB_URL ASIGNANDO EL VALOR DE
 * LA CONEXION DE TU MONGODB
 */
const uri = process.env.DB_URL;

export const connectDB = async () => {
    try {
        await mongoose.connect(uri)
        console.log("DB connected!" )
    } catch(error) {
        console.log(error)
    }
}
