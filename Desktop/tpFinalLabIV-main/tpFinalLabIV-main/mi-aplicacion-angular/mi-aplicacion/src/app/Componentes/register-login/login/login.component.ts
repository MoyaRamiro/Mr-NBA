import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginRegisterService } from 'src/app/Servicios/LoginRegister/login-register.service';
import { User } from 'src/app/types/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service : LoginRegisterService, private router : Router) {}


  
  loginForm = new FormGroup({
    userName : new FormControl(''),
    password : new FormControl('')
  })

  showActiveUsers(){
    console.log(this.service.returnUsersFromLocalStorage());
    console.log("USUARIO ACTIVO...................... ")
    console.log(this.service.getActiveUser());

    
  }

  submitLogin(){
    let cartelError = document.querySelector("#errorMsg") as HTMLElement

    const userName = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;

    const isValidUser = this.service.validateUser(userName, password);

    if (isValidUser){
      const UserFromLocalStorage = this.service.getUser(userName)

      if(UserFromLocalStorage){
        this.service.setActiveUser(UserFromLocalStorage);
        console.log(UserFromLocalStorage);
        this.router.navigate(['../../']);
      } else {
        console.error("Usuario no encontrado en el almacenamiento local.");
      }

      

      
    } else {
      
      cartelError.textContent = "ERROR // LAS CREDENCIALES NO COINCIDEN....."
    }
  }

  clearCartel(){
    let cartelError = document.querySelector("#errorMsg") as HTMLElement;
    cartelError.innerHTML = "";
  }

  

}
