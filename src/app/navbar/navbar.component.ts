import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
   
  }

  logout(){
    this.auth.logout()
    this.router.navigateByUrl("")
  }

}
