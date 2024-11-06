import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginRegisterService } from 'src/app/Servicios/LoginRegister/login-register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.css']
})
export class SeccionesComponent {

  constructor(private route : ActivatedRoute, private service : LoginRegisterService, private router : Router) { }

  ngOnInit(){

  }

  verifyUser(rout : string){
    const activeUser = this.service.getActiveUser();

    if (activeUser !== null && Object.keys(activeUser).length === 0){
      //this.router.navigate(["/registerLogin"]);
      this.router.navigate([rout]);
      alert("Debes iniciar sesion para acceder a la pagina!");

    } else {
      this.router.navigate([rout]);
    }

  }

}

