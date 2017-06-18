import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { PricipalComponent } from '../pricipal/pricipal.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  constructor(public usu:UserService, public router:Router) { 
    /**if(usu.user){
      console.log(usu.user);
    }else{
      console.log("asdasdasdasd");
    }*/
  }
  cuenta = {};
  usuario:string;
  contra:string;
  usuarioR:string;
  contraR:string;


  ngOnInit() {
  }

  log(){
    /*this.cuenta = {user: this.usuario, c: this.contra}
    console.log(this.cuenta);*/
    this.usu.login(this.usuario, this.contra)
    .then(data =>{
      this.cuenta = data;
      console.log("success", data);
      if(data.id != undefined){
        console.log("login");
        localStorage.setItem('id', data.id);
        localStorage.setItem('usuario', data.usuario);
        localStorage.setItem('tipo', data.tipo);
        localStorage.setItem('local', data.local);
        this.router.navigate(['/hub']);
        location.reload();
      }else{
        alert("incorrecto");
      }
    }).catch(err =>{
      console.log("error", err);
    });
  }

  reg(){
    this.cuenta = {usuario:this.usuario, contra:this.contra, tipo:"cliente", local:null}
    this.usu.register(this.cuenta)
    .then(data =>{
      this.cuenta = data;
      console.log("login");
      console.log("success", data);
    }).catch(err =>{
      console.log("error", err);
    });
    console.log(this.cuenta);
  }

  adm(){
    this.usuario = "sofia";
    this.contra = "748159";
    this.log();
  }
  ger(){
    this.usuario = "jose1";
    this.contra = "456789";
    this.log();
  }
  emp(){
    this.usuario = "jorge";
    this.contra = "45693";
    this.log();
  }
  cli(){
    this.usuario = "juan1";
    this.contra = "123456";
    this.log();
  }

}
