import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../reservas.service';
import { UserService } from '../user.service';
import { OfertasService } from '../ofertas.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mod',
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.css'],
  providers: [ReservasService, UserService, OfertasService]
})
export class ModComponent implements OnInit {

  tipo = localStorage.getItem('tipo');

  locales;
  productos;
  ofertas;
  usuarios;

  res;

  local = {
    idlocal: "",
    nombre:"Nombre",
    latitud:"Latitud",
    longitud: "Longitud",
    direccion: "Dirección",
    imagen1: "Imagen 1(URL)",
    imagen2: "Imagen 2(URL)",
    imagen3: "Imagen 3(URL)"
  }
  producto = {
    id: "",
    nombre: "Nombre",
    precio: "Precio",
    imagen: "Imagen(URL)"
  }
  oferta = {
    id: "",
    precio: "Precio",
    local: "Local",
    limite: "AAAA-MM-DD",
    descripcion: "Descripción"
  }
  usuario = {
    id: "",
    usuario: "Usuario",
    contrasena: "Contraseña",
    local: "0",
    tipo: "cliente"
  }

  constructor(public reser: ReservasService, public usu:UserService, public ofer:OfertasService, public router:Router) {
    this.reser.traerLocales()
      .then(data =>{
        this.locales = data;
        //console.log("locales", this.locales);
      }).catch(err =>{
        console.log("error", err);
      });
    this.reser.traerProductos()
      .then(data =>{
        this.productos = data;
        //console.log("productos", this.productos);
      }).catch(err =>{
        console.log("error", err);
      });
    this.usu.users()
      .then(data =>{
        this.usuarios = data;
        //console.log("usuarios", this.usuarios);
      }).catch(err =>{
        console.log("error", err);
      });

      this.ofer.traerOfertas()
      .then(data =>{
        this.ofertas = data;
        //console.log("locales", this.locales);
      }).catch(err =>{
        console.log("error", err);
      });
   }

  ngOnInit() {
  }

  sEleme(tipo, ind){
    switch(tipo){
      case "loc":
        this.local = this.locales[ind];
        break;
      case "prod":
        this.producto = this.productos[ind];
        break;
      case "ofer":
        this.oferta = this.ofertas[ind];
        break;
      case "user":
        this.usuario = this.usuarios[ind];
        break;
    }
  }

  loc(){
    this.reser.actualizarLocal(this.local.idlocal, this.local)
    .then(data =>{
      this.res = data;
      if(this.res == true){
        alert("Local actualizado con exito");
        this.router.navigate(['/hub']);
      }else{
        alert("Hubo un problema al actualizar local. Revise los datos y vuelva a intentar")
      }
      console.log("user", this.res);
    }).catch(err =>{
      console.log("error", err);
    });
  }

  prod(){
    this.reser.modProd(this.producto.id, this.producto.nombre, this.producto.precio, this.producto.imagen)
    .then(data =>{
      this.res = data;
      if(this.res == true){
        alert("Producto actualizado con exito");
        this.router.navigate(['/hub']);
      }else{
        alert("Hubo un problema al actualizar producto. Revise los datos y vuelva a intentar")
      }
      console.log("user", this.res);
    }).catch(err =>{
      console.log("error", err);
    });
  }

  ofe(){
    this.reser.modOfer(this.oferta.id, this.oferta.precio, this.oferta.local, this.oferta.limite, this.oferta.descripcion)
    .then(data =>{
      this.res = data;
      if(this.res == true){
        alert("Oferta actualizada con exito");
        this.router.navigate(['/hub']);
      }else{
        alert("Hubo un problema al actualizar oferta. Revise los datos y vuelva a intentar")
      }
      console.log("user", this.res);
    }).catch(err =>{
      console.log("error", err);
    });
  }

  us(){
    this.usu.actualizarUser(this.usuario.id, this.usuario)
    .then(data =>{
      this.res = data;
      if(this.res == true){
        alert("Usuario actualizado con exito");
        this.router.navigate(['/hub']);
      }else{
        alert("Hubo un problema al actualizar usuario. Revise los datos y vuelva a intentar")
      }
      console.log("user", this.res);
    }).catch(err =>{
      console.log("error", err);
    });
  }
}
