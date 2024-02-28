import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/types/User';
import { LoginRegisterService } from 'src/app/Servicios/LoginRegister/login-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  public registerForm : FormGroup;


  constructor(private service : LoginRegisterService) {

    this.registerForm = new FormGroup({
      userName : new FormControl('', Validators.required),
      email : new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) 
      ]),
      dni : new FormControl('', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^\d+$/)
      ]),
      password : new FormControl('', [
        Validators.required,
        Validators.minLength(10), 
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/) 
      ])
    })

  }

  ngOnInit(){
    console.log(this.service.returnUsersFromLocalStorage())
  }

  


  sendForm(){
    

    let user = new User();
    user.userId = this.service.getNextId();
    user.userName = this.registerForm?.get("userName")?.value!;
    user.email = this.registerForm?.get("email")?.value!;
    user.dni = this.registerForm?.get("dni")?.value!;
    user.password = this.registerForm?.get("password")?.value!;
    let cartel = document.querySelector(".userExists") as HTMLParagraphElement;
    
    if(this.service.addUser(user)){
      this.registerForm.reset();
      cartel.innerHTML = "";
      alert('Registro exitoso');
    } else {
      cartel.innerHTML = "No se ha podido registrar el usuario (mail, dni o username repetidos)"
    }
    
  }
  

}
