import { Injectable } from '@angular/core';
import { User } from './group-data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:3000/api/"


@Injectable({
  providedIn: 'root'
})
/**
 * Handles all HTTP requests to server for group CRUD and users
 */
export class UserDataService {
  readonly defaultImage = "http://localhost:3000/profileImages/default.jpg"
  constructor(private httpClient: HttpClient) { }

  registerUser(user: User){
    return this.httpClient.post<User>(API_URL + "register", user)
  }
  getUser(user_id: string){
    return this.httpClient.get<User>(API_URL + "users/" + user_id)
  }

  updateUsr(user_id: string, email: string | null, password: string | null){
    return this.httpClient.put<User>(API_URL + "users/" + user_id, {email: email, password: password})
  }
  uploadProfileImg(user_id: string, img: File){
    const formData = new FormData();
    formData.append("profileimage", img)
    return this.httpClient.post<any>(API_URL + "users/" + user_id + "/profileimage", formData)
  }

  changeAdminRole(username: string, admin: boolean){
    return this.httpClient.post(API_URL + "users/" + "groupadmin",{username: username, groupadmin: admin})
  }
  removeAllUsers(){
    return this.httpClient.delete(API_URL + "users")
  }

}
