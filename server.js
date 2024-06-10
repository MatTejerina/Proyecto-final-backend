const express = require('express');
const app = express();
require('dotenv').config();

// mongoose
const mongoose = require('mongoose');

// Middleware de json
app.use(express.json());

// importación de rutas
const userRoutes = require('./routes/userRouter');
const petRoutes = require('./routes/petRouter');

// conexión a DB
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('conexión a DB con éxito!!!');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar con DB');
    }
};
dbConnection();

// uso de rutas
app.use('/', userRoutes);
app.use('/', petRoutes);

// configuración del puerto
app.listen(process.env.PORT, () => {
    console.log(`El puerto ${process.env.PORT} funciona bien...`);
});
