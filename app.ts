import express from 'express';
import cors from 'cors'
import connectDB from './config'

import User from './src/routes/user'; // Usuarios
import Class from './src/routes/classes'; // Clases

const PORT = 3000
const app = express();
app.use(cors())
app.use(express.json())

//añadir cosas
app.use('/api', User)
app.use('/api', Class)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
});

connectDB //conexión a la base de datos