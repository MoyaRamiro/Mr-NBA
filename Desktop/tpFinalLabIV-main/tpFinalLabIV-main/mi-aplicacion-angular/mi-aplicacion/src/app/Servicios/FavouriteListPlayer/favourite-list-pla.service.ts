import { Injectable } from '@angular/core';
import { Player } from 'src/app/types/Players';
import { BehaviorSubject, retry } from 'rxjs';
import { LoginRegisterService } from '../LoginRegister/login-register.service';

@Injectable({
  providedIn: 'root'
})
export class FavouriteListService {

  private favoriteList: Player[] = [];

  constructor(private service : LoginRegisterService) {
  }


  update(list: Player[]) {
    this.favoriteList = list;

    let activeUser = this.service.getActiveUser();

    activeUser.playersFavouriteList = this.favoriteList;

    localStorage.setItem('user', JSON.stringify(activeUser));

    this.service.updateUser(activeUser);  

    console.log("USUARIO ACTIVO:");
    console.log(activeUser);
  }

  getData() {
    const activeUser = this.service.getActiveUser()

    return activeUser.playersFavouriteList;
  }

 

}
