import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from './global.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public identidad: any;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  login(usuario:Usuario){
    let params = JSON.stringify(usuario);
    return this._http.put(this.url+'/usuario/login',params,{headers: this.headersVariable})
  }


  getIdentidad(){
    var identidad2 = JSON.parse(localStorage.getItem('identidad') || '{}');
    if(identidad2 != 'undefined'){
      this.identidad = identidad2
    }else{
      this.identidad = null;
    }

    return this.identidad;
  }
}
