import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, User } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string = ""
  userExists: boolean = false

  constructor(private router: Router, public storageService: StorageService) { }

  ngOnInit(): void {
  }

  clickedLogin(){
    
  }

}
