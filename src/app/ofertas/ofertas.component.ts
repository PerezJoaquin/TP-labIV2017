import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { ReservasService } from '../reservas.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css'],
  providers: [OfertasService, ReservasService]
})
export class OfertasComponent implements OnInit {

  varOfertas;
  local1 = '1';
  local2 = '2';
  local3 = '3';
  ret;

  constructor(public ofer:OfertasService, public reser:ReservasService) { 
    this.ofer.traerOfertas()
    .then(data =>{
      this.varOfertas = data;
      console.log("success ofertas", this.varOfertas);
    }).catch(err =>{
      console.log("error", err);
    });
  }

  ngOnInit() {
  }

  locT(){
    this.local1 = '1';
    this.local2 = '2';
    this.local3 = '3';
  }
  loc1(){
    this.local1 = '1';
    this.local2 = '1';
    this.local3 = '1';
  }
  loc2(){
    this.local1 = '2';
    this.local2 = '2';
    this.local3 = '2';
  }
  loc3(){
    this.local1 = '3';
    this.local2 = '3';
    this.local3 = '3';
  }

  ordenar(index){
    /*this.reser.guardarOpOferta(this.varOfertas[index].id, localStorage.getItem('id'))
      .then(data =>{
        this.ret = data;
        console.log("op", this.ret);
      }).catch(err =>{
        console.log("error", err);
      });*/
  }

}
