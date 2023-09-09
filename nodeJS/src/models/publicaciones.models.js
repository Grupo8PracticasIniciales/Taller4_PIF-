'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var publicacionesSchema = Schema({
    autor: String,
    curso: String,
    catedratico: String,
    mensaje: String,
    fecha: Date, 
    comentarios: []
})

module.exports = mongoose.model('publicaciones', publicacionesSchema)