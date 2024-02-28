import { Injectable } from '@angular/core';
import { last } from 'rxjs';
import { User } from 'src/app/types/User';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor() { }


  private registeredUsers: User[] = []
  private activeUser: User = {};

  saveUsers(users: Array<User>) {
    localStorage.setItem("usuarios", JSON.stringify(users));
  }

  returnUsersFromLocalStorage(): Array<User> {
    const userData = localStorage.getItem("usuarios");

    if (userData) {
      return JSON.parse(userData) as User[];
    } else {
      return [];
    }
  }

  setActiveUser(user: User) {
    this.activeUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getActiveUser() {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user: User = JSON.parse(userString);
      this.activeUser = user;
      console.log('usuario activo')
      console.log(user)
    }

    return this.activeUser;
  }

  isAciveUser() {
    if (this.activeUser && Object.keys(this.activeUser).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  getUser(username: string | undefined | null): User | null {
    this.registeredUsers = this.returnUsersFromLocalStorage();

    const userFound = this.registeredUsers.find(user => user.userName === username);

    if (userFound) {
      return userFound
    } else {
      return null;
    }
  }

  updateUser(updatedUser: User) {
    this.registeredUsers = this.returnUsersFromLocalStorage();

    this.registeredUsers = this.registeredUsers.map(user => user.userId === updatedUser.userId ? updatedUser : user);

    this.saveUsers(this.registeredUsers);
  }

  addUser(user: User) {
    this.registeredUsers = this.returnUsersFromLocalStorage();
    //retorna false si existen usuarios con mismo mail, dni o username iguales, retorna true si no hay users con coincidencias


    if (this.validateRegister(user)) {
      console.log("no se ha podido hacer el registro.... usuarios con mail, dni o username repetidos")
      return false;
    } else {
      this.registeredUsers.push(user);
      this.saveUsers(this.registeredUsers);
      console.log("usuario registrado correctamente")
      console.log(this.returnUsersFromLocalStorage());
      return true;
    }

  }

  validateRegister(user: User) {
    this.registeredUsers = this.returnUsersFromLocalStorage();
    //retorna true si existen usuarios con mismo mail, dni o username iguales
    return this.registeredUsers.some(userRegistrado => userRegistrado.email == user.email || userRegistrado.dni == user.dni || userRegistrado.userName == user.userName)
  }

  getNextId(): number {
    const users = this.returnUsersFromLocalStorage();

    if (users && users.length > 0) {
      const lastUser = users[users.length - 1];

      if (lastUser && lastUser.userId !== undefined) {
        return lastUser.userId + 1;
      } else {
        console.error('Error: lastUser.userId es undefined.');
        return 1;
      }
    } else {
      return 1;
    }
  }

  validateUser(userName: string | undefined | null, password: string | undefined | null) {
    this.registeredUsers = this.returnUsersFromLocalStorage();

    return this.registeredUsers.find(user => user.userName == userName && user.password == password);
  }
}
