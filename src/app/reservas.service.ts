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

  //---------------------------
  reser(fecha:string, userid:number, descripcion:string, idlocal: string){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/reservar', {fecha, userid, descripcion, idlocal})
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  traerLocales(){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.get('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/locales')
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  traerReservas(userid:string){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/reservas', {userid})
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  traerOfertasuser(userid:string){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/opofer', {userid})
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  guardarOpOferta(iditem:string, userid:string, lat, long){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/guardarop', {iditem, userid, tipo:'oferta', lat, long})
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }
  guardarOpProducto(iditem:string, userid:string, fireid:string, lat:string, long:string){
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/guardarop', {iditem, userid, tipo:'producto', fireid, lat, long})
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  traerOfertasId(id:string){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/oferta', {id})
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
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/operaciones', {PH:'ph'})
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  guardarProducto(nombre:string, precio, imagen:string){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/guardaprod', {nombre, precio, imagen})
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  traerProductosUser(userid:string){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/opprod', {userid})
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  guardarOferta(precio, local, limite, descripcion){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/guardarof', {precio, local, limite, descripcion})
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  actualizarLocal(id, local){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/localmod', {id, nombre:local.nombre, 
                          direccion:local.direccion, imagen1:local.imagen1, imagen2:local.imagen2,
                          imagen3:local.imagen3})
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  guardarLocal(nombre, direccion, latitud, longitud, img1, img2, img3){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/guardarlocal', {nombre, direccion, latitud, longitud, img1, img2, img3})
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  ModOp(id, iditem, userid, tipo, fireid, lat, long, estado){
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/modop', {id, iditem, userid, tipo, fireid, lat, long, estado})
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  dire(usuLa, usuLo, desLa, desLo){
    return this.http.get('https://maps.googleapis.com/maps/api/directions/json?origin='+usuLa+','+usuLo+
    '&destination='+desLa+','+desLo+'&key=AIzaSyB9P5u7jeoTduNue5REvxG2GFlJldFCUOI')
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  traerFireProd(){
    return this.http.get('https://pizzeria-1533a.firebaseio.com/pedidos/' + localStorage.getItem('id') + '.json')
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  traerUnFireProd(key){
    return this.http.get('https://pizzeria-1533a.firebaseio.com/pedidos/' + localStorage.getItem('id') + '/' + key + '.json')
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  traerTodosFireProd(){
    return this.http.get('https://pizzeria-1533a.firebaseio.com/pedidos.json')
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  traerEst(){
    return this.http.get('https://pizzeria-1533a.firebaseio.com/estadisticas.json')
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  traerGan(id){
    return this.http.get('https://pizzeria-1533a.firebaseio.com/estadisticas/ganancias/'+id+'/ganan.json')
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  traerLogs(){
    return this.http.get('https://pizzeria-1533a.firebaseio.com/estadisticas/logs.json')
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  traerProdLoc(id){
    return this.http.get('https://pizzeria-1533a.firebaseio.com/estadisticas/prodloc/'+id+'/cantidad.json')
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  modProd(id, nombre, precio, imagen){
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/prodmod', {id, nombre, precio, imagen})
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  modOfer(id, precio, local, limite, descripcion){
    return this.http.post('https://pizeriaapi.000webhostapp.com/pizzeria/index.php/ofermod', {id, precio, local, limite, descripcion})
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
