import { Component, OnInit } from '@angular/core';
import { GroupDataService, Group } from '../services/group-data.service';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css', '../app.component.css'],
})
export class GroupsComponent implements OnInit {
  public groups: Array<Group> = [];
  public groupToEdit: Group | null
 
  constructor(public groupsDataService: GroupDataService, public authService: AuthenticationService) {}

  ngOnInit(): void {
    this.getAllGroups();
  }
  getAllGroups(): void {
    this.groupsDataService.getAllGroups().subscribe((groups) => {
      console.log(groups);
      this.groups = groups;
      this.groupToEdit = null
    });
  }

  deleteGroup(group_Id: string | undefined) {
    if (group_Id) {
      this.groupsDataService.deleteGroup(group_Id).subscribe((res) => {
        this.getAllGroups()
      });
    }
  }
  editGroup(idx: number){
    this.groupToEdit = this.groups[idx]
  }
}
