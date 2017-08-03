import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../reservas.service';
import { OfertasService } from '../ofertas.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  providers: [ReservasService, OfertasService, UserService]
})
export class ListaComponent implements OnInit {
  oper;
  usuarios;
  ofertas;
  locales;
  firefire;
  fireProd;
  ret;


  constructor(public usu: UserService, public ofer:OfertasService, public reser:ReservasService) { 
    this.reser.traerTodosFireProd()
      .then(data =>{
        this.fireProd = data;
      }).catch(err =>{
        console.log("error productos", err);
      });

    this.reser.traerLocales()
      .then(data =>{
        this.locales = data;
        //console.log("productos", this.locales);
      }).catch(err =>{
        console.log("error locales", err);
      });

    this.reser.traerOperaciones()
      .then(data =>{
        this.oper = data;
        //console.log("operaciones", this.oper);
      }).catch(err =>{
        console.log("error operaciones", err);
      });

    this.ofer.traerOfertas()
      .then(data =>{
        this.ofertas = data;
        //console.log("ofertas", this.ofertas);
      }).catch(err =>{
        console.log("error ofertas", err);
      });
    
    this.usu.users()
      .then(data =>{
        this.usuarios = data;
        //console.log("usuarios", this.usuarios);
      }).catch(err =>{
        console.log("error usuarios", err);
      });
  }

  ngOnInit() {
  }

  estado(ind, est){
    this.oper[ind].estado = est;
  }

  actu(i){
    this.reser.ModOp(this.oper[i].id, this.oper[i].iditem, this.oper[i].userid, this.oper[i].tipo, this.oper[i].fireid, this.oper[i].lat, this.oper[i].long, this.oper[i].estado)
    .then(data =>{
      this.ret = data;
      if(this.ret){
        alert("Operación modificada con exito");
      }
      console.log("modOperacion", this.ret);
    }).catch(err =>{
      console.log("error guardar operación", err);
    });
  }

}
