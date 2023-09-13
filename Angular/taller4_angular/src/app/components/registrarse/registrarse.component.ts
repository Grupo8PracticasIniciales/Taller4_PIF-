import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css'],
  providers:[UsuarioService]
})
export class RegistrarseComponent {
  public usuarioNuevo: Usuario

  constructor(private _router: Router,private _usuarioService: UsuarioService){
    this.usuarioNuevo=new Usuario("","","","","",[])

  }

  regresar(){
    this._router.navigate(['/login'])

  }

  registrar(){
    this._usuarioService.registrarUsuario(this.usuarioNuevo).subscribe(
      response=>{
        console.log(response)
        Swal.fire(
          'Usuario registrado con exito',
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
