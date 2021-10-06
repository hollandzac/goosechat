import { Component, EventEmitter, OnInit, Output, Input, OnChanges } from '@angular/core';
import { Group, GroupDataService } from 'src/app/services/group-data.service';

@Component({
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.css'],
})
export class UpdateGroupComponent implements OnChanges {
  @Input() group: Group;
  public groupError: string | null = null;
  public updateGroupName:string
  public updateGroupDescription:string | null

  @Output('getAllGroups') getAllGroups: EventEmitter<any> = new EventEmitter();

  constructor(private groupsDataService: GroupDataService) {}

  ngOnChanges(): void {
    this.updateGroupName = this.group.groupName
    this.updateGroupDescription = this.group.description
  }
  updateGroup() {
    let updatedGroup:Group = {
      groupName: this.updateGroupName,
      description: this.updateGroupDescription,
      users: this.group.users,
      assistants: this.group.assistants,
      channels: this.group.channels
    }
    if (this.group._id) {
      this.groupsDataService
        .updateGroup(this.group._id, updatedGroup)
        .subscribe((res) => {
          this.getAllGroups.emit()
        }, (error) => {
          this.groupError = "Error"
        })
    }
  }
}
