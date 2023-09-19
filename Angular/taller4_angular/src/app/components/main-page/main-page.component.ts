import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comentario } from 'src/app/models/comentario.model';
import { Publicacion } from 'src/app/models/publicacion.model';
import { ComentarioService } from 'src/app/services/comentario.service';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [UsuarioService, PublicacionService, ComentarioService]
})
export class MainPageComponent implements OnInit{

  public todosLosUsuarios: any
  public todasLasPublicaciones: any
  public publicacionNueva: Publicacion
  public datoBuscado: Publicacion;
  public publicacionMarcador: number = 1
  public publicacionCurso: any
  public publicacionCatedratico: any
  public comentarioPorPublicacion: any
  public nuevoComentario: Comentario
  id_publicacion_asignar: String = ''

  constructor(private _usuarioService: UsuarioService, private _publicacionService: PublicacionService, private _comentarioService: ComentarioService, private _router: Router){
    this.publicacionNueva = new Publicacion("","","","","",[])
    this.datoBuscado = new Publicacion("","","","","",[])
    this.nuevoComentario = new Comentario("","","","")
    this.publicacionMarcador = 1
  }
  ngOnInit(): void {
    this.obtenerUsuarios()
    this.obtenerPublicaciones()
  }

  obtenerUsuarios(){
    this._usuarioService.obtenerUsuarios().subscribe(
      response=>{
        this.todosLosUsuarios = response
      },
      error=>{
        console.log(<any> error)
      }
    )
  }

  obtenerPublicaciones(){

    this._publicacionService.obtenerPublicaciones().subscribe(
      response=>{
        this.todasLasPublicaciones = response
      },
      error =>{
        console.log(<any>error)
      }
    )
  }

  obtenerPublicacionesCurso(){

    this._publicacionService.obtenerPublicacionCurso(this.datoBuscado).subscribe(
      response=>{
        this.publicacionCurso = response
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  obtenerPublicacionesCatedratico(){

    this._publicacionService.obtenerPublicacionCatedratico(this.datoBuscado).subscribe(
      response=>{
        this.publicacionCatedratico = response
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  agregarDatosUsuario(){
    this.publicacionNueva.autor_nombre = this._usuarioService.getIdentidad().nombre
    this.publicacionNueva.autor_apellido = this._usuarioService.getIdentidad().apellido
  }

  cambiarpublicacionMarcador(numero: number){
    this.publicacionMarcador = numero
    this.obtenerPublicaciones()
    this.obtenerPublicacionesCatedratico()
    this.obtenerPublicacionesCurso()
  }

  crearPublicacion(){
    this.agregarDatosUsuario()
    this._publicacionService.crearPublicacion(this.publicacionNueva).subscribe(
      response=>{

        console.log(this.publicacionNueva.autor_nombre)

        Swal.fire(
          'Publicacion creada con exito!',
          'success'
        )
        this.publicacionNueva = new Publicacion("","","","","",[])
        this.obtenerPublicaciones()
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  cargarComentarios(id_comentario: String){
    this._comentarioService.obtenerComentarios(id_comentario).subscribe(
      response=>{
        this.comentarioPorPublicacion = response
        this.id_publicacion_asignar = id_comentario
      },
      error =>{
        console.log(<any>error)
      }
    )
  }

  crearComentario(){
    this.nuevoComentario.nombre_usuario = this._usuarioService.getIdentidad().nombre
    this.nuevoComentario.apellido_usuario = this._usuarioService.getIdentidad().apellido
    this.nuevoComentario.id_publicacion = this.id_publicacion_asignar
    this._comentarioService.crearComentario(this.nuevoComentario).subscribe(
      response=>{
        Swal.fire(
          'Comentario Creado con éxito!',
          'success'
        )
        this.cargarComentarios(this.id_publicacion_asignar)
        this.nuevoComentario = new Comentario("","","","")
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  setIdUsuario(id: String){
    this._usuarioService.setUsuarioSeleccionado(id)
    this._router.navigate(['/profile'])
  }

}
