import { Injectable } from '@angular/core';
import { User } from './group-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor() { }

  setUser(user: User){
  }
  logout(){
    localStorage.removeItem('currentUser')
  }
}
