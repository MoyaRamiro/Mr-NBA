// profile.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { LoginRegisterService } from 'src/app/Servicios/LoginRegister/login-register.service';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Output() closeProfileEvent = new EventEmitter();


  get user(): User {
    return this.service.getActiveUser();
  }

  constructor(private service : LoginRegisterService){}

  closeProfile() {
    this.closeProfileEvent.emit();
  }

  closeSession(){
    this.service.setActiveUser({})
  }
}