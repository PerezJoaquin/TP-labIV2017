import { Component, OnInit, ElementRef, NgZone, ViewChild, Directive, Input } from '@angular/core';
import { ReservasService } from '../reservas.service';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';




@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
  providers: [ReservasService]
})
export class ReservaComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public userLat: number;
  public userLong: number;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  hoy;
  dat;
  fecha;
  desc;
  userId;
  closeResult: string;
  locales;
  localElegido;
  origin;
  destination;
  direcciones;

  constructor(public reservas:ReservasService, public modalService:NgbModal, public router:Router,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
    this.hoy = new Date();
    this.reservas.traerLocales()
        .then(data =>{
          this.locales = data;
          console.log("Locales", this.locales);
        }).catch(err =>{
          console.log("error", err);
        });
        
   }

  ngOnInit() {
    this.zoom = 12;
    this.latitude = -34.660880;
    this.longitude = -58.364769;
    this.userLat = -34.660880;
    this.userLong = -58.364769;
    this.setCurrentPosition();
  }

  public setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.userLat = position.coords.latitude;
        this.userLong = position.coords.longitude;
        /*this.origin = {lat:this.userLat, lng: this.userLong};
        this.destination = {lat:this.longitude, lng:this.latitude};
        console.log(this.origin);
        console.log(this.destination);*/
        this.zoom = 12;
      });
    }
  }

  res(){
    if(this.hoy.getFullYear() == this.dat.year && (this.hoy.getMonth()+1) == this.dat.month && 
    this.dat.day <= (this.hoy.getDate()+5) && this.dat.day >= (this.hoy.getDate()+2) && this.dat.day >= this.hoy.getDate()){
      this.fecha = this.dat.year + "-" + this.dat.month + "-" + this.dat.day;
      this.userId = localStorage.getItem('id');
      this.reservas.reser(this.fecha, this.userId, this.desc, this.localElegido.idlocal)
        .then(data =>{
          alert("Reserva existosa");
          this.router.navigate(['/hub']);
          console.log("success", data);
        }).catch(err =>{
          console.log("error", err);
        });
    }else{
      alert("La fecha de reserva seleccionada debe ser entre dos y cinco días desde la fecha actual");
    }
  }
  
  sLocal(id){
    console.log(this.locales[id]);
    this.latitude = Number(this.locales[id].latitud);  
    this.longitude = Number(this.locales[id].longitud);
    this.localElegido = this.locales[id];
    this.zoom = 16;
  }
}
