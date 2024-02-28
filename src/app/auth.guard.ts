import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginRegisterService } from './Servicios/LoginRegister/login-register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: LoginRegisterService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    
    if (this.authService.isAciveUser()) {
      return true; 
    } else {
      this.router.navigate(['/registerLogin']);
      return false; 
    }
  }
}
