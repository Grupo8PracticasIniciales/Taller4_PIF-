'use strict'

const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const Usuario =  require('./src/models/usuario.model')
const Publicacion = require('./src/models/publicaciones.models')
const Comentario = require('./src/models/comentarios.model')
const Curso = require('./src/models/cursos.model')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())


app.post("/usuario/crearUsuario", async(req,res)=>{
    var nuevoUsuario = new Usuario({...req.body});
    var usuarioInsertado = await nuevoUsuario.save();
    return res.status(201).json(usuarioInsertado);
})

app.get('/usuario/obtenerUsuarios',async(req,res)=>{
    var todosUsuarios
    todosUsuarios =  await Usuario.find()
    return res.status(200).json(todosUsuarios)
})

app.delete("/usuario/eliminarUsuario/:id",async(req,res)=>{
    var {id} = req.params
    var usuarioEliminado = await Usuario.findByIdAndDelete(id);
    return res.status(200).send(usuarioEliminado)
})

app.put("/usuario/editarUsuario/:id",async(req,res)=>{
    var {id} = req.params;
    var params = req.body
    await Usuario.updateOne({_id: id}, params);
    var usuarioActualizado = await Usuario.findById(id)
    return res.status(200).send(usuarioActualizado)
})

app.get("/usuario/obtenerUsuarioId/:id",async(req,res)=>{
    var {id} = req.params;

    var usuarioEncontrado = await Usuario.findById(id);
    return res.status(200).json(usuarioEncontrado)
})

app.put("/usuario/login",async(req,res)=>{
    var params = req.body
    var usuarioLogeado = await Usuario.findOne({registro_academico: params.registro_academico, contrasena: params.contrasena});
    return res.status(200).send(usuarioLogeado)
})

app.post('/usuario/comprobarUsuario',async(req,res)=>{
    var params = req.body
    var usuarioComprobado = await Usuario.findOne({registro_academico: params.registro_academico, correo: params.correo});
    return res.status(200).send(usuarioComprobado)
})

app.get('/publicacion/obtenerPublicaciones',async(req,res)=>{
    var publicacionesEncontradas = await Publicacion.find().sort({fecha: -1})
    return res.status(200).json(publicacionesEncontradas)
})

app.post("/publicacion/crearPublicacion",async(req,res)=>{

    var nuevaPublicacion = new Publicacion({...req.body});
    nuevaPublicacion.fecha = new Date()
    var publicacionInsertada = await nuevaPublicacion.save();
    return res.status(201).json(publicacionInsertada);
})

app.delete("/publicacion/eliminarPublicacion/:id",async(req,res)=>{

    var {id} = req.params
    var publicacionEliminada = await Publicacion.findByIdAndDelete(id);
    return res.status(200).send(publicacionEliminada)
})

app.post('/publicacion/obtenerPublicacionesCurso',async(req,res)=>{
    var cursoSeleccionado = req.body.catedratico
    var publicacionesEncontradas = await Publicacion.find({curso: cursoSeleccionado})
    return res.status(200).json(publicacionesEncontradas)
})

app.post('/publicacion/obtenerPublicacionesCatedratico',async(req,res)=>{
    var catedraticoSeleccionado = req.body.catedratico
    var publicacionesEncontradas = await Publicacion.find({catedratico: catedraticoSeleccionado})
    return res.status(200).json(publicacionesEncontradas)
})

app.get('/comentario/obtenerComentarioPublicacion/:id',async(req,res)=>{
    var {id} = req.params
    var comentariosEncontrados = await Comentario.find({id_publicacion: id })
    return res.status(200).json(comentariosEncontrados)
})

app.post('/comentario/crearComentario',async(req,res)=>{
    var nuevoComentario = new Comentario({...req.body});
    var comentarioInsertado = await nuevoComentario.save();
    return res.status(201).json(comentarioInsertado);
})

app.get('/curso/obtenerCursoUsuario/:id',async(req,res)=>{
    var {id} = req.params
    var cursosEncontrados = await Curso.find({id_usuario: id})
    return res.status(200).json(cursosEncontrados)
})

app.post('/curso/agregarCurso',async(req,res)=>{
    var nuevoCurso = new Curso({...req.body});
    var cursoInsertado = await nuevoCurso.save();
    return res.status(201).json(cursoInsertado);
})

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/taller4',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    family:4}).then(()=>{
    console.log("Se encuentra conectado a la base de datos")

    app.listen(3000,()=>{
        console.log("El servidor esta corriendo en el puerto 3000")
    })
}).catch(err=> console.log(err))