import { Component, OnInit } from '@angular/core';
import { Channel, StorageService } from '../services/storage.service';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  newMessage: string = ""
  channel: Channel = {
    name: "Default",
    users: [],
    messages: []
  }
  

  constructor(private route: Router,private activatedRoute: ActivatedRoute, private storage: StorageService, private auth: AuthenticationService) {}

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap
    const groupName = routeParams.get('groupName')
    const channelName = routeParams.get('channelName')

    if(groupName && channelName){
      this.channel = this.storage.getChannel(groupName, channelName)
    }else{
      this.route.navigateByUrl('/groups')
    }
  
  }
  addNewMessage(){
    this.channel.messages.push(`${this.auth.currentUser.username}: ${this.newMessage}`)
    this.newMessage = ""

  }

}
