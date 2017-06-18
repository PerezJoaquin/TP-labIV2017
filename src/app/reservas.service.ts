import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class ReservasService {
  /*public user;
  public contra;*/
  headers;
  options;
  constructor(public http:Http) {}

  /*reser(){
    return this.http.get('http://localhost/pizzeria/index.php/login?usuario='+user+"&contrasena="+contra)
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }*/
  

  /*reser(fecha, userid, desc){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost/pizzeria/index.php/registrar?fecha='+fecha+"&userid="+userid+"&descripcion="+desc)
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }*/
  reser(fecha:string, userid:number, descripcion:string){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post('http://localhost/pizzeria/index.php/reservar', {fecha, userid, descripcion}, this.options)
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
