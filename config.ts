import mongoose from "mongoose"
const uri = "mongodb://127.0.0.1:27017/Proyecto_CS"

export const connectDB = () => {
    mongoose.connect(uri, {})
    .then(() => {console.log("Conexión exitosa")})
    .catch(err => {console.error("Error de conexión", err)})
}
