import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/cursos.model';
import { CursoService } from 'src/app/services/curso.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  providers: [UsuarioService,CursoService]
})
export class MyProfileComponent implements OnInit{

  public usuarioEncontrado: any
  public identidad: any
  public cursoNuevo: Curso
  public cursosEncontrados: any

  constructor(private _usuarioService: UsuarioService, private _cursoService: CursoService){
    this.identidad = this._usuarioService.getIdentidad()
    this.cursoNuevo = new Curso("","","")
  }

    ngOnInit(): void {
      this.obtenerUsuario()
      this.obtenerCursos()
    }

  obtenerUsuario(){
    this._usuarioService.obtenerUsuarioId(this.identidad._id).subscribe(
      response =>{
        this.usuarioEncontrado = response
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

  crearCurso(){
    this.cursoNuevo.id_usuario = this.identidad._id
    this._cursoService.agregarCurso(this.cursoNuevo).subscribe(
      response =>{
        Swal.fire(
          'Comentario Creado con éxito!',
          'success'
        )
        this.obtenerCursos()
        this.cursoNuevo = new Curso("","","")
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

  obtenerCursos(){
    this._cursoService.obtenerCursos(this.identidad._id).subscribe(
      response =>{
        this.cursosEncontrados = response
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

}
