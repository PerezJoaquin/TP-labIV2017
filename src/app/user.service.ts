import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class UserService {
  /*public user;
  public contra;*/
  constructor(public http:Http) {}

  login(user, contra){
    return this.http.get('http://localhost/pizzeria/index.php/login?usuario='+user+"&contrasena="+contra)
    .toPromise()
    .then(this.extraer)
    .catch(this.error);
  }

  register(user){
    return this.http.get('http://localhost/pizzeria/index.php/registrar?usuario='+user.usuario+"&contrasena="+user.contra+"&tipo="+user.tipo+"&local="+user.local)
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
