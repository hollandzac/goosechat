import { Component, OnInit } from '@angular/core';
import { StorageService, Group, Role, Channel } from '../services/storage.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  newGroupName: string = ""
  newChannelName: string = ""
  newGroupError: boolean = false
  newChannelErr: boolean = false


  constructor(public storageService: StorageService) {

   }

  ngOnInit(): void {
    this.storageService.getData()
  }
  addNewGroup(){
    this.newGroupError = this.storageService.newGroup(this.newGroupName)
    this.newGroupName = ""
  }
  removeGroup(group: Group){
    this.storageService.removeGroup(group)
  }
  addNewChannel(group: Group){
    this.newChannelErr = this.storageService.newChannel(this.newChannelName, group)
    this.newChannelName = ""
  }
  removeChannel(group: Group, channel: Channel){
    this.storageService.removeChannel(channel, group)
  }

}
