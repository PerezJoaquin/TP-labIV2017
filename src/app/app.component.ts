import { Component } from '@angular/core';
import { UserService } from './user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  tipo;

  constructor(public router:Router){
     if(localStorage.getItem('token') == 'null' || localStorage.getItem('token') == 'undefined' || localStorage.getItem('token') == null){
      //alert("no hay ususario logueado");
      this.router.navigate(['/login']);
    }else{
      this.router.navigate(['/hub']);
      this.tipo = this.comp();
    }
  }

  logout(){
    localStorage.setItem('id', null);
    localStorage.setItem('token', null);
    localStorage.setItem('tipo', null);
    this.router.navigate(['/']);
    location.reload();
  }

  comp(){
    return localStorage.getItem('tipo');
  }
}
