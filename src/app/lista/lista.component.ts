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
  op;
  usuarios;
  ofertas;
  productos;

  constructor(public usu: UserService, public ofer:OfertasService, public reser:ReservasService) { 
    this.reser.traerProductos()
      .then(data =>{
        this.productos = data;
        console.log("productos", this.productos);
      }).catch(err =>{
        console.log("error", err);
      });

    this.reser.traerOperaciones()
      .then(data =>{
        this.op = data;
        console.log("operaciones", this.op);
      }).catch(err =>{
        console.log("error", err);
      });

    this.ofer.traerOfertas()
      .then(data =>{
        this.ofertas = data;
        console.log("ofertas", this.ofertas);
      }).catch(err =>{
        console.log("error", err);
      });
    
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

}
