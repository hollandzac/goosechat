import { Component,OnInit } from '@angular/core';
import { GroupDataService, Channel, Group } from '../services/group-data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ChannelDataService } from '../services/channel-data.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css', '../app.component.css']
})
export class GroupComponent implements OnInit {
  public group: Group
  public group_Id: string
  public channelToEdit: Channel | null
  public newChannelName: string = ""
  public newDescription: string = ""
  public channelError: string | null = null

  constructor(public groupsDataService: GroupDataService, private route: ActivatedRoute, private channelDataService: ChannelDataService) {
  }

  ngOnInit(): void {
    const group_Id: string | null = this.route.snapshot.paramMap.get('group_Id')

    if(group_Id){
      this.group_Id = group_Id
      this.getGroup(group_Id)
    }
  }

  getGroup(group_Id: string): void{
    this.groupsDataService.getGroup(group_Id).subscribe(group => {
      this.group = group
    })
  }

  deleteChannel(channel_Id:string | undefined){
    console.log(channel_Id)
    if(channel_Id){
      this.channelDataService.deleteChannel(this.group_Id, channel_Id ).subscribe( res =>{
        this.getGroup(this.group_Id)
      })
    }
    
  }
}