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
   user = {
    id:'',
    usuario:'',
    tipo:'',
    local:''
  };
  constructor(public router:Router){
     if(localStorage.getItem('id') == 'null' || localStorage.getItem('id') == 'undefined'){
      //alert("no hay ususario logueado");
      this.router.navigate(['/login']);
    }else{
      this.user.id = localStorage.getItem('id');
      this.user.usuario = localStorage.getItem('usuario');
      this.user.tipo = localStorage.getItem('tipo');
      this.user.local = localStorage.getItem('local');
      console.log(this.user);
      //this.router.navigate(['/hub']);
    }
  }

  logout(){
    localStorage.setItem('id', null);
    localStorage.setItem('usuario', null);
    localStorage.setItem('tipo', null);
    localStorage.setItem('local', null);
    location.reload();
    //this.router.navigate(['/login']);
  }
}
