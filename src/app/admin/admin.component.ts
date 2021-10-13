import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public username = ""
  public errorString:string | null = null

  constructor(public userService: UserDataService) { }

  ngOnInit(): void {

  }
  //Promote or demote a user depending on input
  changeUser(flag: boolean){
    this.userService.changeAdminRole(this.username, flag).subscribe( res => {
      if(flag){
        this.errorString = "Promoted"
      }else{
        this.errorString = "Demoted"
      }
    }, err =>{
      this.errorString = "Nothing entered"
    })
  }
  //Remove all users database
  removeAllUsers(){
    this.userService.removeAllUsers().subscribe( res => {
      this.errorString = "Removed all users"
    })
  }

}
