import { Component, OnInit, NgZone } from '@angular/core';
import {Router} from '@angular/router';
import { ReservasService } from '../reservas.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MapsAPILoader, SebmGoogleMap, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  providers: [ReservasService, AngularFireDatabase, GoogleMapsAPIWrapper]
})
export class PedidosComponent implements OnInit {
  productos;
  ret;
  counter;
  coun;
  len;
  precio;
  total={pedidos: new Array(),precio:0, gorcliente:null};
  fire;
  key = "au";
  lat;
  long;


  constructor(public router:Router, public reser: ReservasService, public db: AngularFireDatabase,
              private mapsAPILoader: MapsAPILoader, public gmapsApi: GoogleMapsAPIWrapper,
              private ngZone: NgZone) {
    
    for(this.counter=0; this.counter < this.len; this.counter++){
      this.productos[this.counter].ag = false;
    }
    this.precio = 0;
    this.coun = 0;
    

    this.fire = db.object('https://pizzeria-1533a.firebaseio.com/' + localStorage.getItem('id')+'/'+this.key);
    console.log(this.fire);
    this.setCurrentPosition();
  }

  ngOnInit() {
    this.reser.traerProductos()
        .then(data =>{
          this.len = data.length;
          this.productos = data;
          console.log("productos", this.productos);
        }).catch(err =>{
          console.log("error", err);
        });
  }

  pedir(){
    /*this.reser.guardarOpProducto(this.productos[index].id, localStorage.getItem('id'))
      .then(data =>{
        this.ret = data;
        alert("Pedido exitoso");
        console.log("op", this.ret);
      }).catch(err =>{
        console.log("error", err);
      });*/
      let aa = 0;
      let aux = 0;
      for(aa=0; aa < this.coun ; aa++){
        aux = this.total.pedidos[aa].precio * this.total.pedidos[aa].cantidad
        this.precio += aux;
        aux = 0;
      }
      if(confirm("El total es: $" + this.precio + ".\nContinuar?")){
        let today = new Date();
        let dd = today.getDate();
        let mmm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        let hh = today.getHours();
        let mm = today.getMinutes();
        let ss = today.getSeconds();
        this.key = dd + '' + mmm + '' + yyyy + '' + hh + '' + mm + '' + ss;

        this.total.precio = this.precio;
        this.fire = this.db.object('https://pizzeria-1533a.firebaseio.com/pedidos/' + localStorage.getItem('id')+'/'+this.key);

        this.setCurrentPosition();
        this.reser.guardarOpProducto("0", localStorage.getItem('id'), ""+this.key, ""+this.lat, ""+this.long)
          .then(data =>{
            this.ret = data;
            console.log("op", this.ret);
          }).catch(err =>{
            console.log("error", err);
          });

        //this.fire.set(this.total);
        console.log(this.lat, this.long);
        alert("Compra registrada");
      }
      
      this.precio = 0;
  }

  agregar(index){
    if(!this.productos[index].ag){
      this.total.pedidos.push(this.productos[index]);
      this.total.pedidos[this.coun].cantidad = 1;
      this.productos[index].ag = true;
      this.coun++;
      //alert("asdasdasd");
    }else{
      let aa = 0;
      for(aa=0; aa < this.len ; aa++){
        if(this.total.pedidos[aa].id == this.productos[index].id){
          this.total.pedidos.splice(aa, 1);
          this.productos[this.counter].ag = false;
          this.coun--;
          return;
        }
      }
    }
    console.log("agregado", index, this.total.pedidos);
  }

  cant(ind, can){
    let aa = 0;
    for(aa=0; aa < this.len ; aa++){
      if(this.total.pedidos[aa].id == this.productos[ind].id){
        this.total.pedidos[aa].cantidad = can;
        return;
      }
    }
  }

  setCurrentPosition(){
     if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        console.log(this.lat, this.long);
      });
    }
  }

}
