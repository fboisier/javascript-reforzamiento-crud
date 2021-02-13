const { Router } = require('express');
const { Usuario } = require('../db');
const router = Router();

/// configuramos con router todas las rutas que queramos. ej: router.get('/')...

router.get("/usuarios", async (req, res) => {

    const usuarios = await Usuario.findAll();

    let mensaje = req.flash("mensaje");
    let error = req.flash("error");

    res.render("index", { mensaje, error, usuarios });

});

router.post("/usuario/new", async (req, res) => {

    //const usuario = Usuario.create(req.body);

    let existeError = false;

    if (req.body.nombre == "") {
        req.flash("error", "el campo nombre es obligatorio");
        existeError = true;
    }
    if (req.body.apellido == "") {
        req.flash("error", "el campo apellido es obligatorio");
        existeError = true;
    }
    if (req.body.email == "") {
        req.flash("error", "el campo email es obligatorio");
        existeError = true;
    }
    if (req.body.password == "") {
        req.flash("error", "el campo password es obligatorio");
        existeError = true;
    }
    if (req.body.cpassword != req.body.password) {
        req.flash("error", "las contraseñas no coinciden.");
        existeError = true;
    }


    const datosFormulario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.password,
    };



    const encontrados = await Usuario.findAll({ where: { email: datosFormulario.email } });

    if (encontrados.length > 0) {
        req.flash("error", `El correo ${datosFormulario.email}, ya se encuentra registrado.`);
        existeError = true;
    }


    if (existeError != true) {
        const usuario = await Usuario.create(datosFormulario);
        req.flash("mensaje", "Exito, se acaba de crear el usuario " + usuario.nombre);
    }

    res.redirect("/usuarios");

});

router.get('/usuarios/eliminar/:id', async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);
    await usuario.destroy();

    req.flash("mensaje", "Exito, se acaba de eliminar el usuario " + usuario.nombre);
    res.redirect("/usuarios");
});




router.get('/usuarios/editar/:id', async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);

    let mensaje = req.flash("mensaje");
    let error = req.flash("error");

    res.render("editar", { mensaje, error, usuario });
});


router.post('/usuario/editar/:id', async (req, res) => {


    //const usuario = Usuario.create(req.body);

    let existeError = false;

    if (req.body.nombre == "") {
        req.flash("error", "el campo nombre es obligatorio");
        existeError = true;
    }
    if (req.body.apellido == "") {
        req.flash("error", "el campo apellido es obligatorio");
        existeError = true;
    }
    if (req.body.email == "") {
        req.flash("error", "el campo email es obligatorio");
        existeError = true;
    }
    if (req.body.password == "") {
        req.flash("error", "el campo password es obligatorio");
        existeError = true;
    }
    if (req.body.cpassword != req.body.password) {
        req.flash("error", "las contraseñas no coinciden.");
        existeError = true;
    }


    const datosFormulario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.password,
    };


    if (existeError != true) {

        const usuario = await Usuario.findByPk(req.params.id);

        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.email = req.body.email;
        usuario.password = req.body.password;

        await usuario.save();
        req.flash("mensaje", "Exito, se acaba de actualizat el usuario " + usuario.nombre);
    }

    res.redirect("/usuarios");




});


module.exports = router;