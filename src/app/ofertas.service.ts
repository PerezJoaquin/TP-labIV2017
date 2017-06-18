import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class OfertasService {
  constructor(public http:Http) {}

  traerOfertas(){
    return this.http.get('http://localhost/pizzeria/index.php/ofertas')
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
