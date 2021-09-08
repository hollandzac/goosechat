import { Injectable } from '@angular/core';
import { User } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser:User = {}
  constructor() { }

  setUser(user: User){
    this.currentUser = user
    localStorage.setItem('currentUser',  JSON.stringify(user))
  }
  logout(){
    localStorage.removeItem('currentUser')
  }
}
