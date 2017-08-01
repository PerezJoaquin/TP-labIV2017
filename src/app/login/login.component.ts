import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { PricipalComponent } from '../pricipal/pricipal.component';
import {Router} from '@angular/router';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService, JwtHelper ]
})
export class LoginComponent implements OnInit {

  constructor(public usu:UserService, public router:Router, public jwt:JwtHelper ) { 
  }
  cuenta = {};
  usuario:string;
  contra:string;
  usuarioR:string;
  contraR:string;


  ngOnInit() {
  }

  log(){
    this.usu.login(this.usuario, this.contra)
    .then(data =>{
      this.cuenta = data;
      //console.log("success", data);
      if(data.estado == 'inactivo'){
        alert("Usuario bloqueado por el sistema");
      }else if(data.id != null){
        //console.log("login");
        localStorage.setItem('id', data.id);
        localStorage.setItem('token', data.tok);
        localStorage.setItem('tipo', data.tipo);
        console.log(
          this.jwt.decodeToken(data.tok)
        );
        this.router.navigate(['/']);
        location.reload();
      }else{
        alert("Usuario o contraseña incorrectos");
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
