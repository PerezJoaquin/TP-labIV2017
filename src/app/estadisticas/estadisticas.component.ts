import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../reservas.service';
import { OfertasService } from '../ofertas.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
  providers:[ReservasService, OfertasService, UserService]
})
export class EstadisticasComponent implements OnInit {

  panel = "ven";
  fire;
  locales;
  prodCount = 0;
  prod;
  clone = [{data:new Array(), label:'Ganancias'}];
  clone2 = [{data:new Array(), label:'Ganancias'}];

  oper;
  usuarios;
  ofertas;
  firefire;
  fireProd;
  ret;
  logs;

  ventas = {
    options: {
      scaleShowVerticalLines: false,
      responsive: true
    },
    barChartLabels:new Array(),
    barChartType:'bar',
    barChartLegend:false,
    barChartData:[{data:[10,10,10], label:'Ganancias'}]
  }

  produc = {
    options: {
      scaleShowVerticalLines: false,
      responsive: true
    },
    barChartLabels:new Array(),
    barChartType:'doughnut',
    barChartLegend:false,
    barChartData:[{data:[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10], label:'Cantidad vendida'}]
  }

  constructor(public usu: UserService, public ofer:OfertasService, public reser:ReservasService) { 
    this.reser.traerEst()
      .then(data =>{
        this.fire = data;
      }).catch(err =>{
        console.log("error productos", err);
      });

    this.reser.traerLogs()
      .then(data =>{
        this.logs = data;
      }).catch(err =>{
        console.log("error productos", err);
      });

    this.reser.traerTodosFireProd()
      .then(data =>{
        this.fireProd = data;
      }).catch(err =>{
        console.log("error productos", err);
      });

    this.reser.traerOperaciones()
      .then(data =>{
        this.oper = data;
        //console.log("operaciones", this.oper);
      }).catch(err =>{
        console.log("error operaciones", err);
      });

    this.ofer.traerOfertas()
      .then(data =>{
        this.ofertas = data;
        //console.log("ofertas", this.ofertas);
      }).catch(err =>{
        console.log("error ofertas", err);
      });

    this.usu.users()
      .then(data =>{
        this.usuarios = data;
        //console.log("usuarios", this.usuarios);
      }).catch(err =>{
        console.log("error usuarios", err);
      });
    
    this.reser.traerProductos()
      .then(data =>{
        this.prod = data;
        let pro = {barChartLabels:new Array(), barChartData:[{data:new Array(), label:'Cantidad vendida'}]};
        let res = this.reser;
        this.prod.forEach(function(element) {
          res.traerProdLoc(element.id)
            .then(data =>{
              if(!isNaN(data)){
                pro.barChartData[0].data.push(Number(data));
                pro.barChartLabels.push(element.nombre);
              }else{
                pro.barChartData[0].data.push(0);
                pro.barChartLabels.push(element.nombre);
              }
            }).catch(err =>{
              console.log("error productos", err);
            });
        });
        
        this.clone2 = JSON.parse(JSON.stringify(this.produc.barChartData));
        this.clone2[0].data = pro.barChartData[0].data;
        console.log(this.clone2);

        this.produc.barChartLabels = pro.barChartLabels;
        this.produc.barChartLegend = true;
      }).catch(err =>{
        console.log("error productos", err);
      });

    this.reser.traerLocales()
      .then(data =>{
        this.locales = data;
        let ven = {barChartLabels:new Array(), barChartData:[{data:new Array(), label:'Ganancias'}]};
        let res = this.reser;
        this.locales.forEach(function(element) {
          
          res.traerGan(element.idlocal)
            .then(data =>{
              if(!isNaN(data)){
                ven.barChartData[0].data.push(Number(data)); 
                ven.barChartLabels.push(element.nombre);
              }else{
                ven.barChartData[0].data.push(0);
                ven.barChartLabels.push(element.nombre);
              }
            }).catch(err =>{
              console.log("error locales", err);
            });
        });
        let clone = JSON.parse(JSON.stringify(this.ventas.barChartData));
        this.clone[0].data = ven.barChartData[0].data;

        this.ventas.barChartLabels = ven.barChartLabels;
        this.ventas.barChartLegend = true;
      }).catch(err =>{
        console.log("error locales", err);
      });
  }

  ngOnInit() {
  }
  cli(){
    this.ventas.barChartData = this.clone;
    this.produc.barChartData = this.clone2;
  }

}
