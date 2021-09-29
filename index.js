const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

require('dotenv').config();

const corsOptionsAuth = {
    origin: 'http://localhost:4001',
    methods: 'GET, POST',
}

const corsOptionsEvents = {
    origin: 'http://localhost:4001',
    methods: 'POST, GET, UPDATE, DELETE',
}

// crear servidor con express
const app = express();

// dbConnection
dbConnection();

app.use( express.static('public') );
app.use( express.json() );

app.use( "/api/auth", cors( corsOptionsAuth ), require( "./routers/auth" ) );
app.use( "/api/events", cors( corsOptionsEvents ), require( "./routers/events" ) );

// escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en port: ${ process.env.PORT }`)
} )