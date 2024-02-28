import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/types/User';
import { LoginRegisterService } from 'src/app/Servicios/LoginRegister/login-register.service';



@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent {
  constructor(private route: ActivatedRoute, private LogRegService: LoginRegisterService) { }
}
