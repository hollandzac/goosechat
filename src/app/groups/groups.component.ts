import { Component, OnInit } from '@angular/core';
import { GroupDataService, Group } from '../services/group-data.service';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css', '../app.component.css'],
})
export class GroupsComponent implements OnInit {
  public groups: Array<Group> = [];
  public newGroupName: string = '';
  public newDescription: string = '';
  public groupError: string | null = null;
  constructor(public groupsDataService: GroupDataService) {}

  ngOnInit(): void {
    this.getAllGroups();
  }
  private getAllGroups(): void {
    this.groupsDataService.getAllGroups().subscribe((groups) => {
      console.log(groups);
      this.groups = groups;
    });
  }
  //Creates a group from form import then sends a post request to server
  addNewGroup() {
    let newGroup: Group = {
      groupName: this.newGroupName,
      description: this.newDescription,
      users: [],
      channels: [],
      assistants: [],
    };
    //Post new group if res status 4xx display error
    this.groupsDataService.addGroup(newGroup).subscribe(
      (res) => {
        this.groupError = null;
        this.getAllGroups();
      },
      (error) => {
        console.log(error.status);
        if (error.status === 409) {
          this.groupError = 'Conflict group with that name exists';
        }
      }
    );
  }
  deleteGroup(group_Id: string | undefined, idx: number) {
    if (group_Id) {
      this.groupsDataService.deleteGroup(group_Id).subscribe((res) => {
        this.getAllGroups()
      });
    }
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
