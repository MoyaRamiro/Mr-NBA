import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from './Componentes/equipos/equipos.component';
import { SeccionesComponent } from './Componentes/secciones/secciones.component';
import { PageNotFoundComponent } from './Componentes/page-not-found/page-not-found.component';
import { JugadoresComponent } from './Componentes/jugadores/jugadores.component';
import { ResultadosComponent } from './Componentes/resultados/resultados.component';
import { SobreNosotrosComponent } from './Componentes/sobre-nosotros/sobre-nosotros.component';
import { RegisterLoginComponent } from './Componentes/register-login/register-login.component';
import { LoginComponent } from './Componentes/register-login/login/login.component';
import { RegisterComponent } from './Componentes/register-login/register/register.component';
import { FavouriteListComponent } from './Componentes/favourite-list-team/favourite-list-team.component';
import { FavouriteListPlayerComponent } from './Componentes/favourite-list-player/favourite-list-player.component';
import { AuthGuard } from './auth.guard';
import { DetalleTeamComponent } from './Componentes/detalle-team/detalle-team.component';

const routes: Routes = [
  { path: 'sections', component: SeccionesComponent },
  { path: 'teams', component: EquiposComponent, canActivate: [AuthGuard] },
  { path: 'players', component: JugadoresComponent, canActivate: [AuthGuard] },
  { path: 'results', component: ResultadosComponent, canActivate: [AuthGuard] },
  { path: 'team/:id', component: DetalleTeamComponent, canActivate: [AuthGuard] },
  { path: 'aboutUs', component: SobreNosotrosComponent },
  { path: 'registerLogin', component: RegisterLoginComponent },
  { path: 'registerLogin/login', component: LoginComponent },
  { path: 'registerLogin/register', component: RegisterComponent },
  { path: 'favourite-list', component: FavouriteListComponent, canActivate: [AuthGuard] },
  { path: 'favourite-list-pla', component: FavouriteListPlayerComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/sections', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
