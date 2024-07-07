const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

// mongoose
const mongoose = require('mongoose');

// Middleware de json
app.use(express.json());
// cors

app.use(cors({ credentials: true }));

// importación de rutas
const userRoutes = require('./routes/userRouter');
// const petRoutes = require('./routes/petRouter');
const authRoutes = require('./routes/authRouter')
const vetRoutes = require('./routes/veterinarianRoutes');

// conexión a DB
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONECTION);
    console.log('Conexión a DB con éxito!!!');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};
dbConnection();

// uso de rutas
app.use('/', userRoutes);
// app.use('/', petRoutes);
app.use('/', authRoutes);
app.use('/', vetRoutes);

// configuración del puerto
app.listen(process.env.PORT, () => {
  console.log(`El puerto ${process.env.PORT} funciona bien...`);
});