const Sequelize = require('sequelize');

// acá creamos la conexión a la Base de Datos
const sql = new Sequelize('reforzamiento', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// construir modelos.
const Usuario = sql.define("usuarios", {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre : {
        type : Sequelize.STRING,
        allowNull: false
        
    },
    apellido: {
        type : Sequelize.STRING,
        allowNull: false
    },
    email : {
        type : Sequelize.STRING,
        unique: true,
        allowNull: false,
        comment: 'Este campo debe ser unico y sera por el cual los usuarios entren a la aplicacion.'
    },
    password: {
        type : Sequelize.STRING,
        allowNull: false,
    }

},{timestamps: true});


sql.sync()
.then(() => {
    console.log('Tablas creadas. Conectado a la Base de Datos...');
}); 


module.exports = {
    Usuario
};