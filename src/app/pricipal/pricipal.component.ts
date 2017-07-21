import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ReservasService } from '../reservas.service';

@Component({
  selector: 'app-pricipal',
  templateUrl: './pricipal.component.html',
  styleUrls: ['./pricipal.component.css'],
  providers: [ReservasService]
})
export class PricipalComponent implements OnInit {
  productos;
  ret;
  constructor(public router:Router, public reser: ReservasService) {
    /*this.reser.traerProductos()
        .then(data =>{
          this.productos = data;
          console.log("productos", this.productos);
        }).catch(err =>{
          console.log("error", err);
        });*/
        
  }

  ngOnInit() {
  }

  /*ordenar(index){
    this.reser.guardarOpProducto(this.productos[index].id, localStorage.getItem('id'))
      .then(data =>{
        this.ret = data;
        alert("Pedido exitoso");
        console.log("op", this.ret);
      }).catch(err =>{
        console.log("error", err);
      });
  }*/


}
