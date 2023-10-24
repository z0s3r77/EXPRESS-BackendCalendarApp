const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./database/config');

// Crear el servidor de express
const app = express();


// Base de datos
dbConnection();


// Directorio Público
app.use(express.static('public'));


// LEctura y parseo del body
app.use(express.json());


// Rutas
// TODO: auth // crear, login, renew
// TODO : CRUD: Eventos
app.use('/api/auth', require('./routes/auth'));


//Escuchar peticiones
app.listen(process.env.PORT , ()=> {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});