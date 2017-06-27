import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-listausers',
  templateUrl: './listausers.component.html',
  styleUrls: ['./listausers.component.css'],
  providers: [UserService]
})
export class ListausersComponent implements OnInit {

  usuarios;
  res;

  constructor(public usu: UserService) { 
    this.usu.users()
      .then(data =>{
        this.usuarios = data;
        console.log("usuarios", this.usuarios);
      }).catch(err =>{
        console.log("error", err);
      });
  }

  ngOnInit() {
  }

  cambioI(index){
    this.usuarios[index].estado = 'inactivo';
  }
  cambioA(index){
    this.usuarios[index].estado = 'activo';
  }
  cambiar(index){
    this.usu.actualizarEstado(this.usuarios[index].id, this.usuarios[index].estado)
      .then(data =>{
        this.res = data;
        console.log("usuarios", this.usuarios);
      }).catch(err =>{
        console.log("error", err);
      });
  }

}
