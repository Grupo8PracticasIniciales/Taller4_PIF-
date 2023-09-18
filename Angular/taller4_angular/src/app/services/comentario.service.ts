import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Comentario } from '../models/comentario.model';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  public url: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url
  }

  obtenerComentarios(id: String):Observable<any>{
    return this._http.get(this.url+'/comentario/obtenerComentarioPublicacion/'+id,{headers:this.headersVariable})
  }

  crearComentario(comentario: Comentario): Observable<any>{
    let params = JSON.stringify(comentario)
    return this._http.post(this.url+'/comentario/crearComentario',params, {headers: this.headersVariable});
  }

}
