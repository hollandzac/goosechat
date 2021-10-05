import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GroupDataService, Group } from 'src/app/services/group-data.service';


@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  public newGroupName: string = '';
  public newDescription: string = '';
  public groupError: string | null = null;
  @Output("getAllGroups") getAllGroups: EventEmitter<any> = new EventEmitter();
  constructor(private groupsDataService: GroupDataService) { }

  ngOnInit(): void {
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
        this.getAllGroups.emit();
      },
      (error) => {
        console.log(error.status);
        if (error.status === 409) {
          this.groupError = 'Conflict group with that name exists';
        } else{
          this.groupError = "Error adding new group"
        }
      }
    );
  }
}
