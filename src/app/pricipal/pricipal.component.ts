import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pricipal',
  templateUrl: './pricipal.component.html',
  styleUrls: ['./pricipal.component.css']
})
export class PricipalComponent implements OnInit {
  user = {
    id:'',
    usuario:'',
    tipo:'',
    local:''
  };
  constructor(public router:Router) {
    /*if(localStorage.getItem('id') == 'null'){
      alert("no hay ususario logueado");
      this.router.navigate(['/login']);
    }else{
      this.user.id = localStorage.getItem('id');
      this.user.usuario = localStorage.getItem('usuario');
      this.user.tipo = localStorage.getItem('tipo');
      this.user.local = localStorage.getItem('local');
      console.log(this.user);
    }*/
    this.router.navigate(['/']);
   }

  ngOnInit() {
  }

  logout(){
    localStorage.setItem('id', null);
    localStorage.setItem('usuario', null);
    localStorage.setItem('tipo', null);
    localStorage.setItem('local', null);
    this.router.navigate(['/login']);
  }

}
