import { Component, OnInit, ElementRef, NgZone, ViewChild, Directive, Input } from '@angular/core';
import { ReservasService } from '../reservas.service';
import { MapsAPILoader, SebmGoogleMap, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';

@Component({
  selector: 'app-listalocales',
  templateUrl: './listalocales.component.html',
  styleUrls: ['./listalocales.component.css'],
  providers: [ReservasService]
})
export class ListalocalesComponent implements OnInit {

  tipo;
  locales;
  res;
  public latitude: number;
  public longitude: number;
  public userLat: number;
  public userLong: number;
  public zoom: number;

  constructor(public reser:ReservasService, private mapsAPILoader: MapsAPILoader,private ngZone: NgZone) {
    reser.traerLocales()
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
        this.zoom = 12;
      });
    }
  }

  Num(numb){
    return Number(numb);
  }

}
