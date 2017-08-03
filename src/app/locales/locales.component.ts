import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../reservas.service';
import { UserService } from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css'],
  providers: [ReservasService, UserService]
})
export class LocalesComponent implements OnInit {
  tipo;
  locales;
  res;
  usuarios;
  userid = localStorage.getItem('id');

  constructor(public reser:ReservasService, public usu:UserService, public router:Router) {
    this.tipo = localStorage.getItem('tipo');
    reser.traerLocales()
      .then(data =>{
        this.locales = data;
        //console.log("Locales", this.locales);
      }).catch(err =>{
        console.log("error", err);
      });

    this.usu.users()
      .then(data =>{
        this.usuarios = data;
        //console.log("usuarios", this.usuarios);
      }).catch(err =>{
        console.log("error", err);
      });
  }

  ngOnInit() {
  }

  guardar(index){

    this.reser.actualizarLocal(this.locales[index].idlocal, this.locales[index])
      .then(data =>{
        this.res = data;
        if(this.res == true){
          alert("Local actualizado exitosamente");
          this.router.navigate(['/hub']);
        }else{
          alert("Hubo un error al actualizar el local. Compruebe los datos en intente otra vez")
        }
        console.log("Locales", this.res);
      }).catch(err =>{
        console.log("error locales", err);
      });
      //console.log(this.locales[index])
  }
}
