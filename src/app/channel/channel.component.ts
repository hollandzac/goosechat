import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { io } from "socket.io-client";
import { GroupDataService } from '../services/group-data.service';
import { SocketService } from '../services/socket-service.service';
import { ChannelDataService } from '../services/channel-data.service';

interface Message{
  _id?: string,
  senderUsername: string,
  senderId: string,
  message: string,
  imagePath: string,
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
 
  

  constructor(private route: Router,private activatedRoute: ActivatedRoute, private channelData: ChannelDataService, private auth: AuthenticationService, private socketService: SocketService) {}

  ngOnInit(): void {
    const channel_Id = this.activatedRoute.snapshot.paramMap.get("channel_Id")
    const group_Id = this.activatedRoute.snapshot.paramMap.get("channel_Id")
    
    if(channel_Id && group_Id){
      this.channel_Id = channel_Id
      this.channelData.getChatHistory(group_Id, channel_Id).subscribe(res =>{
        console.log(res.messages)
        this.messages = res.messages
      })
    }
    this.initSocketConnection()
 
  }

  //Initialize Socket Connection and then join this socket to the channel
  private initSocketConnection(): void{
    this.socketService.initSocket()
    this.socketService.joinChannel(this.channel_Id, this.auth.user?._id!)
    this.socketService.onMessage().subscribe( message => {
      console.log(message)
      this.messages.push(message)
    })
  }
  newMessageEntered(): void {
    this.socketService.send(this.newMessage)
    this.newMessage = ""
  } 

}
