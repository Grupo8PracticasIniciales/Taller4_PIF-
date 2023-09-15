import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Publicacion } from '../models/publicacion.model';


@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  public url: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  obtenerPublicaciones():Observable<any>{
    return this._http.get(this.url+'/publicacion/obtenerPublicaciones',{headers:this.headersVariable})
  }

  crearPublicacion(publicacion: Publicacion):Observable<any>{
    let params = JSON.stringify(publicacion);
    return this._http.post(this.url+'/publicacion/crearPublicacion',params,{headers: this.headersVariable})
  }

  obtenerPublicacionCurso(curso: Publicacion): Observable<any>{
    let params = JSON.stringify(curso)
    return this._http.post(this.url+'/publicacion/obtenerPublicacionesCurso',params,{headers: this.headersVariable});
  }

  obtenerPublicacionCatedratico(curso: Publicacion): Observable<any>{
    let params = JSON.stringify(curso)
    return this._http.post(this.url+'/publicacion/obtenerPublicacionesCatedratico',params,{headers: this.headersVariable});
  }

}
