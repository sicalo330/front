import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estudiantes } from '../modelos/estudiantes';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/Estudiantes';
  }


  getEstudiantes(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/GetEstudiantes');
  }

  postEstudiante(estudiante:Estudiantes): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl + '/PostEstudiante', estudiante);
  }

  deleteEstudiante(idEstudiante:number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + '/DeleteEstudiante/'+idEstudiante);
  }

  actualizarEstudiante(estudiante: Estudiantes): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + '/UpdateEstudiante', estudiante);
  }

}
