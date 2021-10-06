import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = ""
  loginError: string | null = null
  constructor(
    private router: Router,
    private auth: AuthenticationService,
  ) {}

  ngOnInit(): void {
    if(this.auth.isAuthenticated()){
      console.log("AUTHENTICATED ROUTE")
      this.router.navigateByUrl("groups")
    }
  }

  clickedLogin() {
    this.auth.login(this.username, this.password).subscribe( res => {
      this.auth.setUser(res)
      this.router.navigateByUrl("groups")
    }, err => {
      this.loginError = "Incorrect username or password"
    })
  }
}
