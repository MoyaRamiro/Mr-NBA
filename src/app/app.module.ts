import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FavouriteListService } from './Servicios/FavouriteListTeam/favourite-list-team.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Componentes/header/header.component';
import { SeccionesComponent } from './Componentes/secciones/secciones.component';
import { ResultadosComponent } from './Componentes/resultados/resultados.component';
import { JugadoresComponent } from './Componentes/jugadores/jugadores.component';
import { SobreNosotrosComponent } from './Componentes/sobre-nosotros/sobre-nosotros.component';
import { PageNotFoundComponent } from './Componentes/page-not-found/page-not-found.component';
import { EquiposComponent } from './Componentes/equipos/equipos.component';
import { RegisterLoginComponent } from './Componentes/register-login/register-login.component';
import { LoginRegisterService } from './Servicios/LoginRegister/login-register.service';
import { FavouriteListComponent } from './Componentes/favourite-list-team/favourite-list-team.component';
import { RegisterComponent } from './Componentes/register-login/register/register.component';
import { LoginComponent } from './Componentes/register-login/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FavouriteListPlayerComponent } from './Componentes/favourite-list-player/favourite-list-player.component';
import { ProfileComponent } from './Componentes/header/profile/profile.component';
import { DetalleTeamComponent } from './Componentes/detalle-team/detalle-team.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SeccionesComponent,
    ResultadosComponent,
    JugadoresComponent,
    SobreNosotrosComponent,
    PageNotFoundComponent,
    EquiposComponent,
    RegisterLoginComponent,
    FavouriteListComponent,
    RegisterComponent,
    LoginComponent,
    FavouriteListPlayerComponent,
    ProfileComponent,
    DetalleTeamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [LoginRegisterService, FavouriteListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
