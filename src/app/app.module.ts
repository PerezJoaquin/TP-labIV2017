import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { HttpModule } from '@angular/http';
import { PricipalComponent } from './pricipal/pricipal.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { ReservaComponent } from './reserva/reserva.component';
import { MapaComponent } from './mapa/mapa.component';
import { AgmCoreModule } from "angular2-google-maps/core";
import { OpantComponent } from './opant/opant.component';
import { DirectionsMapDirective } from './directions-map.directive';
import { AltaComponent } from './alta/alta.component';
import { ListaComponent } from './lista/lista.component';
import { ListausersComponent } from './listausers/listausers.component';
import { LocalesComponent } from './locales/locales.component';
import { ListalocalesComponent } from './listalocales/listalocales.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { ModComponent } from './mod/mod.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ChartsModule } from 'ng2-charts';



const appRoutes:Routes = [
  {path:"login", component:LoginComponent},
  {path:"hub", component:PricipalComponent},
  {path:"ofertas", component:OfertasComponent},
  {path:"reservas", component:ReservaComponent},
  {path:"operaciones", component:OpantComponent},
  {path:"alta", component:AltaComponent},
  {path:"lista", component:ListaComponent},
  {path:"listaUsuarios", component:ListausersComponent},
  {path:"modlocales", component:LocalesComponent},
  {path:"locales", component:ListalocalesComponent},
  {path:"pedidos", component:PedidosComponent},
  {path:"mod", component:ModComponent},
  {path:"estadisticas", component:EstadisticasComponent}
  /*,
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }*/
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PricipalComponent,
    OfertasComponent,
    ReservaComponent,
    MapaComponent,
    OpantComponent,
    DirectionsMapDirective,
    AltaComponent,
    ListaComponent,
    ListausersComponent,
    LocalesComponent,
    ListalocalesComponent,
    PedidosComponent,
    ModComponent,
    EstadisticasComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB9P5u7jeoTduNue5REvxG2GFlJldFCUOI",
      libraries: ["places"]
    }),
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ChartsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
