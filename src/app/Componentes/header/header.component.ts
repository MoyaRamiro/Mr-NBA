import { Component } from '@angular/core';
import { LoginRegisterService } from 'src/app/Servicios/LoginRegister/login-register.service';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  get isActiveUser(): boolean {
    return this.activeUser();
  }
  isProfileOpen = false;
  isSectionsComponent = true;

  constructor(private logService : LoginRegisterService, private router : Router, private activatedRute : ActivatedRoute){}

  ngOnInit(){
    this.router.events.subscribe((event)=>{
      if (event instanceof NavigationEnd){
        this.isSectionsComponent = this.router.url.includes('/sections');
      }
    })
    
    this.activatedRute.params.subscribe(params => {
      
    });

  }

  activeUser(){

    const user = this.logService.getActiveUser();

    if(user && Object.keys(user).length > 0){
      return true;
    } else {
      return false;
    }
  }

  openProfile() {
    this.isProfileOpen = true;
  }

  closeProfile() {
    this.isProfileOpen = false;
  }

  
}
