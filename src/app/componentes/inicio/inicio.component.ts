import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estudiantes } from 'src/app/modelos/estudiantes';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  
  listEstudiantes: Estudiantes [] = []

  datosUsuario: FormGroup;
  editarUsuario: FormGroup;

  idEstudianteEditar: number = 0

  constructor(private estudianteService: EstudiantesService,
              private fb: FormBuilder) {
    this.datosUsuario = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      calificacion: ['', Validators.required]
    })

    this.editarUsuario = this.fb.group({
      editarNombre: ['', Validators.required],
      editarCalificacion: ['', Validators.required]
    })
  }


  ngOnInit(): void {
    this.estudianteService.getEstudiantes().subscribe( data => {
      console.log('asdas')
      this.listEstudiantes = data;
    }, error => {
      console.log('Se presento un error en el consumo de la api: '+ error )
    })
  }

  registrarEstudiante(): void{
    const datos: Estudiantes = {
      id: this.datosUsuario.get('id')!.value,
      nombre: this.datosUsuario.get('nombre')!.value,
      calificacion: this.datosUsuario.get('calificacion')!.value,
    }

    this.estudianteService.postEstudiante(datos).subscribe( data => {
      console.log(data)
      if(data == 'ok'){
        this.listEstudiantes.push(datos);
        this.datosUsuario.reset();
      }
    }, error => {
      console.log('Error al registrar estudiante', error)
    })
  }

  eliminarEstudiante(id: number): void{
    if(confirm('¿Desea eliminar al usuario con id: '+id+' ?')){
      this.estudianteService.deleteEstudiante(id).subscribe( data => {
        this.listEstudiantes.forEach((element, index) => {
          if(element.id == id){
            this.listEstudiantes.splice(index,1);
          }
        });
      }, error => {
        console.log('Error al eliminar el estudiante', error)
      })
    }
  }

  editarEstudiante(id: number): void{
    this.idEstudianteEditar = id;
  }

  actualizarEstudiante():void{
    const datos: Estudiantes = {
      nombre: this.editarUsuario.get('editarNombre')!.value,
      calificacion: this.editarUsuario.get('editarCalificacion')!.value,
      id: this.idEstudianteEditar
    }

    this.estudianteService.actualizarEstudiante(datos).subscribe( data => {
      this.listEstudiantes.forEach((element, index) => {
        if (element.id == this.idEstudianteEditar){
          this.listEstudiantes[index].nombre = datos.nombre;
          this.listEstudiantes[index].calificacion = datos.calificacion;
          this.idEstudianteEditar = 0;
          this.editarUsuario.reset();
        }
      });

    }, error => {
      console.log('Error al actualizar estudiante', error)
    })

  }

}
