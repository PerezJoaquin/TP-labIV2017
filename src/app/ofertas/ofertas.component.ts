import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css'],
  providers: [OfertasService]
})
export class OfertasComponent implements OnInit {

  varOfertas;
  local1 = 'local1';
  local2 = 'local2';
  local3 = 'local3';

  constructor(public ofer:OfertasService) { 
    this.ofer.traerOfertas()
    .then(data =>{
      this.varOfertas = data;
      console.log("success ofertas", data);
      console.log("success ofertas2", this.varOfertas);
    }).catch(err =>{
      console.log("error", err);
    });
  }

  ngOnInit() {
  }

  locT(){
    this.local1 = 'local1';
    this.local2 = 'local2';
    this.local3 = 'local3';
  }
  loc1(){
    this.local1 = 'local1';
    this.local2 = 'local1';
    this.local3 = 'local1';
  }
  loc2(){
    this.local1 = 'local2';
    this.local2 = 'local2';
    this.local3 = 'local2';
  }
  loc3(){
    this.local1 = 'local3';
    this.local2 = 'local3';
    this.local3 = 'local3';
  }

}
