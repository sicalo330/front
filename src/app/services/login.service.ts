import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http:HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/usuario';
  }
  

  getTokenDecoded(): any{
    //jwt helper service lo que hace es recibir el token y lo decodifica, depués lo retorna en un arreglo json legible
    const helper = new JwtHelperService()
    // Permite obtener aun siendo nulo
    const decodedToken = helper.decodeToken(localStorage.getItem('token')!)
    return decodedToken
  }

  removeLocalStorage(): void{
    localStorage.removeItem('token')
  }

  //para los guards
  getToken(): string {
    return localStorage.getItem('token')!
 }

 postData(usuario:Usuario){
  console.log(usuario)
  return this.http.post(this.myAppUrl + this.myApiUrl + '/postUsuario', usuario)
 }
}
