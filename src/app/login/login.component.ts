import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { StorageService } from '../services/storage.service';

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
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}

  clickedLogin() {
    console.log(this.storageService.users)
    let user = this.storageService.getUser(this.userName);
    console.log(user)
    if (user !== undefined) {
      this.auth.setUser(user);
      this.router.navigateByUrl('/groups');
    } else {
      this.error = true;
    }
  }
}
