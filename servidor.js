const express = require("express");
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const port = 8000;

app.use(session({secret: 'estoesunreforzamiento'}));  
app.use(flash());

//    aqui van las configuraciones (los get, use, post, 
//    configuracion de carpeta estaticas (punto 8), etc.)
app.use(express.static(__dirname + "/static"));

// Esto establece la ubicación donde express buscará la vista ejs
app.set('views', __dirname + '/views'); 
// Ahora configuremos el motor de visualización para que express sepa que estamos usando ejs en lugar de otro motor de jade
app.set('view engine', 'ejs');

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

app.use(require('./routes/usuario'));

app.listen( port, () => console.log(`Listening on port: ${port}`) );
