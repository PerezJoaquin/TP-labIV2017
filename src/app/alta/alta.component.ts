import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../reservas.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css'],
  providers: [ReservasService, UserService]
})
export class AltaComponent implements OnInit {
  prodNom;
  prodPre;
  prodImg;

  usuario;
  contra;

  oferPre;
  oferLoc;
  oferLim;
  oferDes;
  fecha;

  cuenta;
  res;
  user={tipo:''};
  locales;
  local;
  productos;
  usuarios;
  sProd;
  sUser;

  nombre;
  latitud;
  longitud;
  direccion;
  imagen1;
  imagen2;
  imagen3;

  constructor(public reser: ReservasService, public usu:UserService) { 
    this.user.tipo = localStorage.getItem('tipo')
    //trear locales. mostrar en dropdown para crear empleado
    this.reser.traerLocales()
      .then(data =>{
        this.locales = data;
        console.log("locales", this.locales);
      }).catch(err =>{
        console.log("error", err);
      });
    this.reser.traerProductos()
      .then(data =>{
        this.productos = data;
        console.log("productos", this.productos);
      }).catch(err =>{
        console.log("error", err);
      });
    this.usu.users()
      .then(data =>{
        this.usuarios = data;
        console.log("usuarios", this.usuarios);
      }).catch(err =>{
        console.log("error", err);
      });
  }

  ngOnInit() {
  }

  producto(){
    this.reser.guardarProducto(this.prodNom, this.prodPre, this.prodImg)
      .then(data =>{
        this.res = data;
        console.log("producto", this.res);
      }).catch(err =>{
        console.log("error", err);
      });
  }

  cliente(){
    this.cuenta = {usuario:this.usuario, contra:this.contra, tipo:"cliente", local:null}
    this.usu.register(this.cuenta)
    .then(data =>{
      this.res = data;
      console.log("cliente", this.res);
    }).catch(err =>{
      console.log("error", err);
    });
  }

  sLocal(index){
    this.local = this.locales[index];
  }

  oferta(){
    this.fecha = this.oferLim.year + "-" + this.oferLim.month + "-" + this.oferLim.day;
    this.reser.guardarOferta(this.oferPre, this.oferLoc, this.fecha, this.oferDes)
      .then(data =>{
        this.res = data;
        console.log("oferta", this.res);
      }).catch(err =>{
        console.log("error", err);
      });
      console.log(this.oferPre, this.oferLoc, this.fecha, this.oferDes);
  }

  empleado(){
    this.cuenta = {usuario:this.usuario, contra:this.contra, tipo:"empleado", local:this.local.nombre}
    this.usu.register(this.cuenta)
    .then(data =>{
      this.res = data;
      console.log("empleado", this.res);
    }).catch(err =>{
      console.log("error", err);
    });
  }

  sProducto(index){
    this.sProd = this.productos[index];
  }
  sUsuario(index){
    this.sUser = this.usuarios[index];
  }

  pedido(){
    this.reser.guardarOpProducto(this.sProd.id, this.sUser.id)
      .then(data =>{
        this.res = data;
        console.log("op", this.res);
      }).catch(err =>{
        console.log("error", err);
      });
  }

  cLocal(){
    this.reser.guardarLocal(this.nombre, this.direccion, this.latitud, this.longitud, this.imagen1, this.imagen2, this.imagen3)
      .then(data =>{
        this.res = data;
        console.log("op", this.res);
      }).catch(err =>{
        console.log("error", err);
      });
  }
}
