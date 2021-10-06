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
  isAdmin(){
    return this.user?.groupAdmin || this.user?.superAdmin
  }
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
