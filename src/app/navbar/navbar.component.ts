import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private storage: StorageService, private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if(this.auth.currentUser != {}){
      this.router.navigateByUrl('/groups')
    }
      this.storage.getData()
  }

  storeData(){
    this.storage.storeData()
  }
  deleteData(){
    localStorage.removeItem('groups')
    ///localStorage.removeItem('')
  }

  logout(){
    console.log('LOGOUT')
    this.router.navigateByUrl('');
    this.auth.logout()
  }

}
