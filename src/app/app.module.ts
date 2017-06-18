import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { HttpModule } from '@angular/http';
import { PricipalComponent } from './pricipal/pricipal.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { ReservaComponent } from './reserva/reserva.component';

const appRoutes:Routes = [
  {path:"login", component:LoginComponent},
  {path:"hub", component:PricipalComponent},
  {path:"ofertas", component:OfertasComponent},
  {path:"reservas", component:ReservaComponent}
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
    ReservaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    FormsModule,
    HttpModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
