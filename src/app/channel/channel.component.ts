import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { io } from "socket.io-client";
import { GroupDataService } from '../services/group-data.service';
import { SocketService } from '../services/socket-service.service';

interface Message{
  username: string,
  message: string
}

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  public newMessage: string = ""
  messages: Array<Message> = []
  private channel_Id:string
 
  

  constructor(private route: Router,private activatedRoute: ActivatedRoute, private groupsDataService: GroupDataService, private auth: AuthenticationService, private socketService: SocketService) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get("channel_Id")
    if(id){
      this.channel_Id = id
    }
    this.initSocketConnection()
 
  }
  private initSocketConnection(): void{
    this.socketService.initSocket()
    this.socketService.joinChannel(this.channel_Id)
    this.socketService.onMessage().subscribe( message => {
      this.messages.push(message)
    })
  }
  newMessageEntered(): void {
    this.socketService.send(this.newMessage)
    this.newMessage = ""
  } 

}
