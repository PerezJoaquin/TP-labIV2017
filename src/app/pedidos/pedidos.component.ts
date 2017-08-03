import { Component, OnInit, NgZone, Inject } from '@angular/core';
import {Router} from '@angular/router';
import { ReservasService } from '../reservas.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MapsAPILoader, SebmGoogleMap, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import {CsvService} from "angular2-json2csv";
/*import * as jsPDFs from 'jspdf'

declare var jsPDF: any;*/
import * as jsPDF from 'jspdf';
import * as jpt from 'jspdf-autotable';
//import * as html2canvas from 'html2canvas';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  providers: [ReservasService, AngularFireDatabase, GoogleMapsAPIWrapper, { provide: 'Window', useValue: window }, CsvService]
})
export class PedidosComponent implements OnInit {
  productos;
  ret;
  counter;
  coun;
  len;
  precio;
  total={pedidos: new Array(),precio:0, local:null, key:null, userid:null};
  fire;
  key = "au";
  lat;
  long;
  locales;
  pdf = false;
  fireprod;


  constructor(@Inject('Window') private window: Window, public router:Router, public reser: ReservasService, public db: AngularFireDatabase,
              private mapsAPILoader: MapsAPILoader, public gmapsApi: GoogleMapsAPIWrapper,
              private ngZone: NgZone, public csv:CsvService) {
    
    for(this.counter=0; this.counter < this.len; this.counter++){
      this.productos[this.counter].ag = false;
    }
    this.precio = 0;
    this.coun = 0;
    

    //this.fire = db.object('https://pizzeria-1533a.firebaseio.com/' + localStorage.getItem('id')+'/'+this.key);
    //console.log(this.fire);
    this.setCurrentPosition();
  }

  ngOnInit() {
    this.reser.traerProductos()
        .then(data =>{
          this.len = data.length;
          this.productos = data;
          //console.log("productos", this.productos);
        }).catch(err =>{
          console.log("error traer productos", err);
        });
    this.reser.traerLocales()
      .then(data =>{
        this.locales = data;
        //console.log("Locales", this.locales);
      }).catch(err =>{
        console.log("error traer locales", err);
      });
  }

  pedir(){
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
        this.total.key = this.key;
        this.total.userid = localStorage.getItem('id');
        this.fire = this.db.object('https://pizzeria-1533a.firebaseio.com/pedidos/' + localStorage.getItem('id')+'/'+this.key);

        this.setCurrentPosition();
        this.reser.guardarOpProducto("0", localStorage.getItem('id'), ""+this.key, ""+this.lat, ""+this.long)
          .then(data =>{
            this.ret = data;
            //console.log("op", this.ret);
          }).catch(err =>{
            console.log("error guardar operación", err);
            alert("Hubo un problema al registrar la compra. Vuelva a intentar");
            return;
          });

        this.fire.set(this.total);
        //console.log(this.lat, this.long);
        alert("Compra registrada");

        //ganancia------------------------------
        let ganancia:number;
        this.reser.traerGan(this.total.local.idlocal)
          .then(data =>{
            if(!isNaN(data)){
              ganancia = Number(data);
            }else{
              ganancia = 0;
            }
            ganancia += Number(this.total.precio);
            this.fire = this.db.object('https://pizzeria-1533a.firebaseio.com/estadisticas/ganancias/'+this.total.local.idlocal);
            this.fire.set({ganan:ganancia});
            //console.log("op", this.ret);
          }).catch(err =>{
            console.log("error guardar operación", err);
          });
        
        //productos---------------------------------
        let tot = this.total;
        let cant;
        let re = this.reser;
        let fi;
        let dbb = this.db;
        this.total.pedidos.forEach(function(element) {
          cant = 0;
          re.traerProdLoc(element.id)
          .then(data =>{
            if(!isNaN(data)){
              cant = Number(data);
            }else{
              cant = 0;
            }
            cant += Number(element.cantidad);
            fi = dbb.object('https://pizzeria-1533a.firebaseio.com/estadisticas/prodloc/'+element.id);
            fi.set({cantidad:cant});
            //console.log("op", this.ret);
          }).catch(err =>{
            console.log("error guardar operación", err);
          });
        });
       
      }
      this.precio = 0;
      //MOSTRAR PDF EXCEL
      this.pdf = true;
          
  }

  agregar(index){
    if(!this.productos[index].ag){
      this.total.pedidos.push(this.productos[index]);
      this.total.pedidos[this.coun].cantidad = 1;
      this.productos[index].ag = true;
      this.coun++;
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
    //console.log("agregado", index, this.total.pedidos);
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
        //console.log(this.lat, this.long);
      });
    }
  }

  sLocal(index){
    //console.log(this.total.local);
    this.total.local = this.locales[index];
  }

  gpdf(){
    let doc = new jsPDF();
    doc.setFontSize(30); 
    doc.text(12, 25, "\t\tPizzeria Argenta");
    doc.setFontSize(20);
    /*let canvas = document.getElementById("canvas");
    let html_container = document.getElementById("pff"),
    html = html_container.innerHTML;

    this.raz.drawHTML(html, canvas);*/
    //doc.text(12, 10, "\t\tPizzeria Argenta");
    //var col = ["Producto", "Cantidad", "Precio unitario"];
    var rows = [];
    let count = 55;
    doc.text(12, 45, "\tProducto\t       Cantidad\t      Precio Unitario");
    for(var key in this.total.pedidos){
        /*var temp = [this.total.pedidos[key].nombre, this.total.pedidos[key].cantidad, "$"+this.total.pedidos[key].precio];
        rows.push(temp);*/
      doc.text(12, count, "  "+this.total.pedidos[key].nombre);
      doc.text(12, count, "\t\t\t\t\t\t"+this.total.pedidos[key].cantidad);
      doc.text(12, count, "\t\t\t\t\t\t\t\t\t\t$"+this.total.pedidos[key].precio);
      count+=10;
    }
     doc.text(12, count+=10, "\tTotal: $" +this.total.precio);
    //rows.push(tempo);
    //doc.autoTable(col, rows);
    //doc.addHTML(document.getElementById('pff'),)

    doc.save('Pedido.pdf');
     
  }

  excel(){
    let datos = new Array();
    //let fields = ['Poducto', 'Cantidad', 'Precio unitario'];
    for(var key in this.total.pedidos){
      datos.push({'Producto':this.total.pedidos[key].nombre, 'Cantidad':this.total.pedidos[key].cantidad, 'Precio unitario':"$"+this.total.pedidos[key].precio})
    }
    datos.push({'Producto':'Total', 'Cantidad':'', 'Precio unitario':"$"+this.total.precio})
    //this.csv.download({data:datos, fields:fields}, 'Pedido');
    this.csv.download(datos, 'Pedido');
      
  }

  volver(){
    this.router.navigate(['/hub']);
  }
}
