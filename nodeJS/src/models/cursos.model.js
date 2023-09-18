'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var cursoSchema = Schema({
    curso: String,
    creditos: String,
    id_usuario: String
})

module.exports = mongoose.model('curso',cursoSchema)