import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class ReservasService {
  /*public user;
  public contra;*/
  headers: Headers;
  options: RequestOptions;
  constructor(public http:Http) {}

  reser(fecha:string, userid:number, descripcion:string, idlocal: string){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/reservar', {fecha, userid, descripcion, idlocal}, this.options)
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  traerLocales(){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.get('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/locales', this.options)
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  traerReservas(userid:string){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/reservas', {userid}, this.options)
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  traerOfertasuser(userid:string){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/opofer', {userid}, this.options)
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  guardarOpOferta(iditem:string, userid:string,){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/guardarop', {iditem, userid, tipo:'oferta'}, this.options)
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }
  guardarOpProducto(iditem:string, userid:string,){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/guardarop', {iditem, userid, tipo:'producto'}, this.options)
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  traerOfertasId(id:string){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/oferta', {id}, this.options)
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  traerProductos(){
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.get('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/productos')
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  traerOperaciones(){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/operaciones', this.options)
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  guardarProducto(nombre:string, precio, imagen:string){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/guardaprod', {nombre, precio, imagen}, this.options)
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  traerProductosUser(userid:string){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/opprod', {userid}, this.options)
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  guardarOferta(precio, local, limite, descripcion){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/guardarof', {precio, local, limite, descripcion}, this.options)
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  actualizarLocal(id, local){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/localmod', {id, nombre:local.nombre, 
                          direccion:local.direccion, imagen1:local.imagen1, imagen2:local.imagen2,
                          imagen3:local.imagen3}, this.options)
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  guardarLocal(nombre, direccion, latitud, longitud, img1, img2, img3){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/guardarlocal', {nombre, direccion, latitud, longitud, img1, img2, img3}, this.options)
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  private extraer(res:Response){
    return res.json() || {};
  }
  private error(res:Response){
    return res;
  }

}
