const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./database/config');
const cors = require('cors');

// Crear el servidor de express
const app = express();


// Base de datos
dbConnection();

app.use(cors());

// Directorio Público
app.use(express.static('public'));


// LEctura y parseo del body
app.use(express.json());


// Rutas
// TODO: auth // crear, login, renew
// TODO : CRUD: Eventos
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})



//Escuchar peticiones
app.listen(process.env.PORT , ()=> {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});