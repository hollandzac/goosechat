import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userName: string = '';
  error: boolean = false;
  constructor(
    private router: Router,
    private auth: AuthenticationService,
  ) {}

  ngOnInit(): void {}

  clickedLogin() {
    this.router.navigateByUrl("/groups")
    
  }
}
