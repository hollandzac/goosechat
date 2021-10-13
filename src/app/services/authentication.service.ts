import { Injectable } from '@angular/core';
import { User } from './group-data.service';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user: User | undefined
  constructor( private httpClient: HttpClient) { }

  //Login checks authentication returns the authentcated user
  login(username: string, password: string){
    return this.httpClient.post<User>("http://localhost:3000/api/login", {username, password})
  }
  setUser(user: User){
    this.user = user
    localStorage.setItem("currentUser", JSON.stringify(user))
  }
  logout(){
    this.user = undefined
    localStorage.removeItem('currentUser')
  }
  /*
  * checks if user is already authenticated
  */
  isAuthenticated(): boolean{
    if(this.user){
      return true
    }
    console.log(this.user)
    let user = localStorage.getItem("currentUser")
    if(user){
      this.user = JSON.parse(user);
      return true
    }
    return false
  }
  isSuperAdmin(){
    return this.user?.superAdmin || false
  }
  isAdmin(){
    return this.user?.groupAdmin || this.user?.superAdmin
  }
  /**
   * Checks to see if a user is and admin or assistant on this group 
  */
  isAssistant(users: Array<string>): boolean{
    let userId = this.user?._id
    if (this.isAdmin()){
      return true
    }
    if(userId && (users.indexOf(userId) !== -1)){
      return true
    }
    return false
  }
  /*
  * checks if user can view group or channel
  */
  isUser(users: Array<string>): boolean{
    if (this.isAdmin()){
      return true
    }
    let userId = this.user?._id
    if(userId && (users.indexOf(userId) !== -1)){
      return true
    }
    return false
  }
}
