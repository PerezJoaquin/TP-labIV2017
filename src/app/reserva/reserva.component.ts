import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../reservas.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
  providers: [ReservasService]
})
export class ReservaComponent implements OnInit {
  hoy;
  dat;
  fecha;
  desc;
  userId;
  constructor(public reservas:ReservasService) {
    this.hoy = new Date();
   }

  ngOnInit() {
  }

  res(){
    if(this.hoy.getFullYear() == this.dat.year && (this.hoy.getMonth()+1) == this.dat.month && 
    this.dat.day <= (this.hoy.getDate()+5) && this.dat.day >= (this.hoy.getDate()+2) && this.dat.day >= this.hoy.getDate()){
      this.fecha = this.dat.year + "-" + this.dat.month + "-" + this.dat.day;
      this.userId = localStorage.getItem('id');
      //this.reservas.reser(this.fecha, this.userId, this.desc);
      this.reservas.reser(this.fecha, this.userId, this.desc)
        .then(data =>{
          //this.cuenta = data;
          console.log("login");
          console.log("success", data);
        }).catch(err =>{
          console.log("error", err);
        });
    }else{
      alert("La fecha de reserva debe ser como minimo dos días y como maximo 5 días desde la fecha actual");
    }
  }
}
