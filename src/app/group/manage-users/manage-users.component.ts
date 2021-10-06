import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChannelDataService } from 'src/app/services/channel-data.service';
import { Channel, Group, GroupDataService } from 'src/app/services/group-data.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnChanges {
  @Input() group:Group
  @Input() channelIdx: number
  @Output() dropManageChannelUsers:EventEmitter<any> = new EventEmitter();

  isAssistant:boolean = false
  username:string = ""
  addError:string | null = null

  

  constructor(public auth:AuthenticationService, private userDataService:UserDataService, private groupDataService:GroupDataService, private channelDataService:ChannelDataService) { }

  ngOnChanges(): void {
    console.log("HI")
  }

  addUser(){
    if(this.channelIdx < 0){
      let newGroup:Group = {
        groupName: this.group.groupName,
        description: this.group.description,
        channels: this.group.channels,
        users: this.group.users,
        assistants:this.group.assistants
      }
      if(this.isAssistant){
        this.groupDataService.addAssistants(this.group._id!, this.username).subscribe( res =>{
          this.group.assistants.push(res._id)
          this.username = ""
          this.addError = null
        }, err => {
          console.log(err)
          this.addError = err.error
          console.log(this.addError)
        })
      }else{
        this.groupDataService.addUser(this.group._id!, this.username).subscribe( res =>{
          this.group.users.push(res._id)
          this.username = ""
          this.addError = null
        }, err => {
          console.log(err)
          this.addError = err.error
        })
      }

      }else{
        
        this.channelDataService.addUserChannel(this.group._id!, this.group.channels[this.channelIdx]._id!, this.username).subscribe( res => {
          this.group.channels[this.channelIdx].users.push(res._id)
          this.username = ""
          this.addError = null
        }, err =>{
          this.addError = err.error;
        })
      }
    }
  

  removeUser(){}



}
