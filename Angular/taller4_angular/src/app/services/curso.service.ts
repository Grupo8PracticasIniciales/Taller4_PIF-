import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Curso } from '../models/cursos.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  public url: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url
  }

  obtenerCursos(id: String):Observable<any>{
    return this._http.get(this.url+'/comentario/obtenerCursoUsuario/'+id,{headers: this.headersVariable})
  }

  agregarCurso(curso: Curso): Observable<any>{
    let params = JSON.stringify(curso);
    return this._http.post(this.url+'/curso/agregarCurso',params,{headers: this.headersVariable})
  }

}
