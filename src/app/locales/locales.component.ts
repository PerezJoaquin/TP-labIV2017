import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../reservas.service';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css'],
  providers: [ReservasService]
})
export class LocalesComponent implements OnInit {
  tipo;
  locales;
  res;

  constructor(public reser:ReservasService) {
    this.tipo = localStorage.getItem('tipo');
    reser.traerLocales()
      .then(data =>{
        this.locales = data;
        console.log("Locales", this.locales);
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
        console.log("Locales", this.res);
      }).catch(err =>{
        console.log("error", err);
      });
  }
}
