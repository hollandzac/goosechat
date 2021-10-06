import { Injectable } from '@angular/core';
import { User } from './group-data.service';
import { HttpClient } from '@angular/common/http';

const API_URL = "http://localhost:3000/api/"

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private httpClient: HttpClient) { }

  registerUser(user: User){
    return this.httpClient.post<User>(API_URL + "register", user)
  }
}
