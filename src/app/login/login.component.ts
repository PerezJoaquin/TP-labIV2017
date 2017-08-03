import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { PricipalComponent } from '../pricipal/pricipal.component';
import {Router} from '@angular/router';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { ReservasService } from '../reservas.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService, JwtHelper, ReservasService, AngularFireDatabase ]
})
export class LoginComponent implements OnInit {

  constructor(public usu:UserService, public router:Router, public jwt:JwtHelper, 
    public reser:ReservasService, public db: AngularFireDatabase ) { 
  }
  cuenta = {};
  usuario:string;
  contra:string;
  usuarioR:string;
  contraR:string;
  fire;
  hoy;


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
        //estdadistica log
        this.hoy = new Date();
        let fecha = this.hoy.getFullYear() + '/' + (this.hoy.getMonth()+1) + '/' + this.hoy.getDate() + ' ' + this.hoy.getHours() + ':' + this.hoy.getMinutes();
        this.fire = this.db.object('https://pizzeria-1533a.firebaseio.com/estadisticas/logs/'+data.id);
        this.fire.set(fecha);

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
      if(!isNaN(data)){
        alert("Registro exitoso")
        this.log();
      }else{
        alert("Hubo un problema al registrarse. Revise los datos en intente otra vez");
      }
    }).catch(err =>{
      console.log("error", err);
    });
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
