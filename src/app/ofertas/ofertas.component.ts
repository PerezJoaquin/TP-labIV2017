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
  sloca = {nombre: "Todos los Locales"};
  locales;
  ret;
  lat;
  long;

  constructor(public ofer:OfertasService, public reser:ReservasService) { 
    this.ofer.traerOfertas()
    .then(data =>{
      this.varOfertas = data;
      console.log("success ofertas", this.varOfertas);
    }).catch(err =>{
      console.log("error", err);
    });
    this.reser.traerLocales()
      .then(data =>{
        this.locales = data;
        console.log("Locales", this.locales);
      }).catch(err =>{
        console.log("error", err);
      });
  }

  ngOnInit() {
  }

  sLocal(id){
    if(id == "todos"){
      this.sloca.nombre = "Todos los Locales";
    }else{
      this.sloca = this.locales[id];
    }
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
