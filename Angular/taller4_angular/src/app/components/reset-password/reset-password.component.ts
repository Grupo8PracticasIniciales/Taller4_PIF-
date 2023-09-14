import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [UsuarioService]
})
export class ResetPasswordComponent implements OnInit{

  public usuarioComprobado: Usuario;
  public validador: boolean = false;
  public usuarioConNuevaContrasena: Usuario;
  public idUsuario: String = ''

  constructor(private _usuarioService: UsuarioService, private _router: Router){
    this.usuarioComprobado = new Usuario("","","","","",[])
    this.usuarioConNuevaContrasena = new Usuario("","","","","",[])
  }
  ngOnInit(): void {}

  comprobarUsuario(){
    this._usuarioService.comprobarUsuario(this.usuarioComprobado).subscribe(
      response=>{
        if(response !=null){
          this.validador = true
          Swal.fire(
            'Encontrado',
            'Usuario y/o registro academico correctos',
            'success'
          )
          //console.log(this.usuarioComprobado)
          this.usuarioConNuevaContrasena  = response
          this.usuarioConNuevaContrasena.contrasena = ''
          this.idUsuario = response._id
          //console.log(this.usuarioConNuevaContrasena)
        }else{
          Swal.fire(
            'Error',
            'Usuario y/o registro academico',
            'error'
          )
        }
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  editarUsuario(){
    this._usuarioService.editarUsuario(this.idUsuario,this.usuarioConNuevaContrasena).subscribe(
      response=>{
        Swal.fire(
          'Encontrado',
          'Contraseña reestablecida exitosamente',
          'success'
        )
        this._router.navigate(['/login'])
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

}
