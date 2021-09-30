import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { io } from "socket.io-client";
import { GroupDataService } from '../services/group-data.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  newMessage: string = ""
 
  

  constructor(private route: Router,private activatedRoute: ActivatedRoute, private groupsDataService: GroupDataService, private auth: AuthenticationService) {}

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap
    const groupName = routeParams.get('groupName')
    const channelName = routeParams.get('channelName')

  //   // if(groupName && channelName){
  //   //   this.channel = this.storage.getChannel(groupName, channelName)
  //   // }else{
  //   //   this.route.navigateByUrl('/groups')
  //   // }
  
  // }
  // addNewMessage(){
  
  // }
  }

}
