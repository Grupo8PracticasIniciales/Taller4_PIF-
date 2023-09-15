import { Component, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/models/publicacion.model';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [UsuarioService, PublicacionService]
})
export class MainPageComponent implements OnInit{

  public todosLosUsuarios: any
  public todasLasPublicaciones: any
  public publicacionNueva: Publicacion
  public datoBuscado: Publicacion;
  public publicacionMarcador: number = 1
  public publicacionCurso: any
  public publicacionCatedratico: any

  constructor(private _usuarioService: UsuarioService, private _publicacionService: PublicacionService){
    this.publicacionNueva = new Publicacion("","","","","",[])
    this.datoBuscado = new Publicacion("","","","","",[])
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

}
