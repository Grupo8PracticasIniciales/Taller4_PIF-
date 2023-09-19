import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css'],
  providers: [UsuarioService, CursoService]
})
export class ProfilesComponent implements OnInit{

  public usuarioEncontrado: any
  public cursosEncontrados: any
  public creditosTotales: number = 0

  constructor(private _usuarioService: UsuarioService, private _cursoService: CursoService){}

  ngOnInit(): void {

    this.cargarUsuario()
    this.obtenerCursos()

  }

  cargarUsuario(){
    this._usuarioService.obtenerUsuarioId(this._usuarioService.getUsuarioSeleccionado()).subscribe(
      response=>{
        this.usuarioEncontrado = response
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  obtenerCursos(){
    this._cursoService.obtenerCursos(this._usuarioService.getUsuarioSeleccionado()).subscribe(
      response=>{
        this.cursosEncontrados = response
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  calcularCreditos(){
    this.creditosTotales = 0
    for (let i = 0; i < this.cursosEncontrados.length; i++) {
      this.creditosTotales = this.creditosTotales + Number(this.cursosEncontrados[i].creditos)
    }
  }

}
