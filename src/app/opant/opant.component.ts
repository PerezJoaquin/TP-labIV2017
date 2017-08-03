import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../reservas.service';
import { OfertasService } from '../ofertas.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-opant',
  templateUrl: './opant.component.html',
  styleUrls: ['./opant.component.css'],
  providers: [ReservasService, OfertasService]
})
export class OpantComponent implements OnInit {

  userRes;
  userOfer;
  userProd;
  ofer;
  prod;
  locales;
  fireProd;

  constructor(public reservas: ReservasService, public ofertas: OfertasService, 
    public db: AngularFireDatabase) {
    this.reservas.traerReservas(localStorage.getItem('id'))
      .then(data =>{
        this.userRes = data;
        //console.log("reservas", this.userRes);
      }).catch(err =>{
        console.log("error", err);
      });

    this.ofertas.traerOfertas()
      .then(data =>{
        this.ofer = data;
        //console.log("ofertas", this.ofer);
      }).catch(err =>{
        console.log("error", err);
      });

    this.reservas.traerOfertasuser(localStorage.getItem('id'))
      .then(data =>{
        this.userOfer = data;
        //console.log("userOfertas", this.userOfer);
      }).catch(err =>{
        console.log("error", err);
      });

    this.reservas.traerProductosUser(localStorage.getItem('id'))
      .then(data =>{
        this.userProd = data;
        //console.log("userProductos", this.userProd);
      }).catch(err =>{
        console.log("error", err);
      });
    this.reservas.traerProductos()
      .then(data =>{
        this.prod = data;
        //console.log("reservas", this.prod);
      }).catch(err =>{
        console.log("error", err);
      });
    this.reservas.traerLocales()
      .then(data =>{
        this.locales = data;
        //console.log("locales", this.locales);
      }).catch(err =>{
        console.log("error", err);
      });

      this.reservas.traerFireProd()
      .then(data =>{
        this.fireProd = data;
        //console.log("fireprod", this.fireProd);
      }).catch(err =>{
        console.log("error", err);
      });
  }

  ngOnInit() {
  }
}
