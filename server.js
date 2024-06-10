const express = require('express');
const app = express();
require('dotenv').config();

//mongoose
const mongoose = require('mongoose');
//Middleware de json
app.use(express.json())

//importacion de rutas
const userRoutes = require('./routes/userRouter')

//coneccion a DB
const dbConcetion = async()=>{
    try {
        mongoose.connect(process.env.DB_CONECTION);
        console.log('coneccion a DB con exito!!!')
    } catch (error) {
        console.log(error)
        throw new Error('Error al concetar con DB')
    }
};
dbConcetion();

//uso de rutas
app.use('/',userRoutes)

//configuracion del puerto
app.listen(process.env.PORT, ()=>{
    console.log(`el puerto ${process.env.PORT} funciona bien...`)
});