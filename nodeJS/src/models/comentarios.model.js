'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var comentarioSchema = Schema({
    nombre_usuario: String,
    apellido_usuario: String,
    comentario: String,
    id_publicacion: String
})

module.exports = mongoose.model('comentario',comentarioSchema)