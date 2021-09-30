import { Component, OnInit } from '@angular/core';
import { GroupDataService, Group } from '../services/group-data.service';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  public groups:Array<Group> = []
  public newGroupName: string = ""
  public newDescription: string = ""
  constructor(public groupsDataService: GroupDataService) {

  }

  ngOnInit(): void {
    this.groupsDataService.getAllGroups().subscribe( groups => {
      console.log(groups)
      this.groups = groups
    })
  }

  addNewGroup(){
    let newGroup: Group = {
      groupName: this.newGroupName,
      description: this.newDescription,
      users: [],
      channels: [],
      assistants: []
    }
    this.groupsDataService.addGroup(newGroup).subscribe(() =>{
      this.groups.push(newGroup)
    })
  }
  // removeGroup(group: Group){
  //   this.storageService.removeGroup(group)
  // }
  // addNewChannel(group: Group){
  //   this.newChannelErr = this.storageService.newChannel(this.newChannelName, group)
  //   this.newChannelName = ""
  // }
  // removeChannel(group: Group, channel: Channel){
  //   this.storageService.removeChannel(channel, group)
  // }

}
