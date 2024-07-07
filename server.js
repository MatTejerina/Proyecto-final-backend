const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

// Middleware de json
app.use(express.json());
// cors
app.use(cors());

// importación de rutas
const userRoutes = require('./routes/userRouter');
const appointmentRoutes = require('./routes/appointmentRoutes');
const petRoutes = require('./routes/petRouter');
const vetRoutes = require('./routes/veterinarianRoutes');
const authRoutes = require('./routes/authRouter');

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

// uso de rutas sin prefijos
app.use('/', appointmentRoutes);
app.use('/', userRoutes);
app.use('/', petRoutes);
app.use('/', vetRoutes);
app.use('/', authRoutes);

// configuración del puerto
app.listen(process.env.PORT, () => {
  console.log(`El puerto ${process.env.PORT} funciona bien...`);
});