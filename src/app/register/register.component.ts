import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../services/group-data.service';
import { UserDataService } from '../services/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public username:string = ""
  public email:string = ""
  public password:string = ""
  public registerError: string | null = null

  constructor(private userDataService:UserDataService, private authService: AuthenticationService, private router:Router) { }

  ngOnInit(): void {
  }
  registerUser(){
    let newUser:User = {
      username: this.username,
      email: this.email,
      password: this.password,
    }
    console.log(newUser)
    this.userDataService.registerUser(newUser).subscribe( res => {
      this.authService.setUser(res)
      this.router.navigateByUrl("/groups")

    },err => {
      console.log(err)
      this.registerError = err.error
      
    })
  }
}
