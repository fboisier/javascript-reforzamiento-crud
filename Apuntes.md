Pasos para crear un proyecto con Node y Express.

1.- Crear la carpeta nueva.
2.- Crear el archivo asociado al servidor. donde comienza todo.
	server.js  ||  servidor.js 

3.- Copiar lo necesario para configurar nuestro servidor express: 

const express = require("express");
const app = express();
const port = 8000;

//    aqui van las configuraciones (los get, use, post, 
//    configuracion de carpeta estaticas (punto 8), etc.)

app.listen( port, () => console.log(`Listening on port: ${port}`) );



4.- configurar que el proyecto(carpeta) usará paquetes de NODE. es decir NPM. 

	npm init   ||   npm init -y (omite las preguntas). 

5.- Installar el paquete express; ejecutar en el terminal : 
npm install express


6.- ejecutar el servidor: 
	node <<nombre elegido en punto 2>>  ej: node server.js

	para salir CONTROL + C 

7.- para no reiniciar con control + c a cada rato el servidor cada vez que exista cambios: 

(si nunca ha ejecutado nodemon en cualquier proyecto, 
primero instalar en modo global: 
npm install -g nodemon)

	nodemon <<nombre elegido en punto 2>>  ej: nodemon server.js

	para salir CONTROL + C 

8.- Para configurar una carpeta estatica. es decir que lo que tenga dentro, quedará disponible en 
nuestro servidor. se hace de esta forma: 

agregar despues de crear express: 

//CONFIGURAMOS QUE LA CARPETA xxxxxxxxxx SEA ESTATICA.
app.use(express.static(__dirname + "/xxxxxxxxxx"));

(Recordar crear la carpeta xxxxxxxxxx)

recordar que solo tomará las rutas con nombres de ARCHIVO. es decir:
<<nombre>>.<<extencion>>
ej:
pancho.html
style.css


//////////////////////// RUTAS //////////////////////

FORMA 1 dentro del mismo archivo server.js

1.- se debe tener lo mismo al pasos anteriores. 

app.get("ACA VA LA RUTA", (req,res)=>{

	// que es lo que retornaremos o haremos...

	res.json({ mensaje: "ok" });
	res.send("<h1>desde el send</h1>");
	res.render("una vista");


});

///////////RUTAS MODO 2 - ARCHIVOS EXTERNOS ///////////////
1.- crear la carpeta routes o como quiera llamarla, pero será la que tenga las rutas.

2.- crear un archivo JS con cualquier nombre y colocar lo basico:

const { Router } = require('express');
const router = Router();

/// configuramos con router todas las rutas que queramos. ej: router.get('/')...


module.exports = router;

3.- indicar en server.js que vamos a ocupar el archivo anterior de la carpeta routes:

app.use(require('./routes/<<nombre de tu archivo en routes>>'));

4.- configurar en el archivo de rutas, las rutas de nuestro proyecto, tal como se hace en el punto 1 , se debe ocupar router en vez de app:  


router.get("ACA VA LA RUTA", (req,res)=>{

	// que es lo que retornaremos o haremos...

	res.json({ mensaje: "ok" });
	res.send("<h1>desde el send</h1>");
	res.render("una vista");


});


//// VISTAS/////

2.- crear la  nueva carpeta que definamos como vista.
2.1 crear dentro de la carpeta nueva un archivo .ejs. 

3.- instalar la libreria o depencia EJS. para usar ese motor de template.

npm install ejs

4.- configurar el uso del ejs ... colocar en server.js

// Esto establece la ubicación donde express buscará la vista ejs
app.set('views', __dirname + '/views'); 
// Ahora configuremos el motor de visualización para que express sepa que estamos usando ejs en lugar de otro motor de jade
app.set('view engine', 'ejs');


// rutas organización. 


// uso de POST. colocar esto en el archivo de configuracion de app para que tome los cambios en general:

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );




/// SQL DDL para crear base de datos:
CREATE SCHEMA `reforzamiento` DEFAULT CHARACTER SET utf8 ;
