'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var usuarioSchema = Schema({
    registro_academico: String,
    nombre: String,
    apellido: String,
    correo: String,
    contrasena: String, 
    cursos_aprobados: []
})

module.exports = mongoose.model('usuario',usuarioSchema)
