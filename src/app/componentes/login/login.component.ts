import { Component } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  datos:FormGroup;
  usuario: Usuario[] = [];

  constructor(private fb: FormBuilder, private loginService: LoginService){
    this.datos = this.fb.group({
      correo: ['', Validators.required],
      contraseña: ['', Validators.required]
    })
  }

  enviarDatos(){
    const datos:Usuario = {
      correo: this.datos.get('correo')!.value,
      contraseña: this.datos.get('contraseña')!.value,
    }
    this.loginService.postData(datos).subscribe(data => {
      console.log(data)
    })
  }

  ngOnInit(){
  }

}
