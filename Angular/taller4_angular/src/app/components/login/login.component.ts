import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {

  public usuarioModel: Usuario
  public identidad: any

  constructor(
    private _router: Router,
    private _usuarioService: UsuarioService
  ){
    this.usuarioModel = new Usuario("","","","","",[])
  }

  ngOnInit():void{}

  login(){
    this._usuarioService.login(this.usuarioModel).subscribe(
      response=>{
        this.identidad = response
        if (this.identidad != null){
          localStorage.setItem('identidad',JSON.stringify(this.identidad))
          this._router.navigate(['/mainPage'])
        }else{
          Swal.fire(
            'Error',
            'Usuario o contraseña incorrectos',
            'error'
          )
        }
      },
      error=>{
        console.log(error)
      }
    )
  }

}
