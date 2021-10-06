import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ChannelDataService } from 'src/app/services/channel-data.service';
import { Channel, Group, GroupDataService } from 'src/app/services/group-data.service';

@Component({
  selector: 'app-update-channel',
  templateUrl: './update-channel.component.html',
  styleUrls: ['./update-channel.component.css']
})
export class UpdateChannelComponent implements OnChanges {

  @Input() channel: Channel;
  @Input() group_Id: string;
  public channelError: string | null = null;
  public updateChannelName:string
  public updateChannelDescription:string | null

  @Output('getGroup') getGroup: EventEmitter<any> = new EventEmitter();

  constructor(private channelDataService: ChannelDataService) {}

  ngOnChanges(): void {
    this.updateChannelName = this.channel.name
    console.log(this.updateChannelName)
    this.updateChannelDescription = this.channel.description
  }
 
  updateChannel() {
    let updatedChannel:Channel = {
      name: this.updateChannelName,
      description: this.updateChannelDescription,
      users: this.channel.users,
    }
    if (this.channel._id) {
      this.channelDataService
        .updateChannel(this.group_Id, this.channel._id, updatedChannel)
        .subscribe((res) => {
          this.getGroup.emit(this.group_Id)
        }, (error) => {
          this.channelError = error.error
        })
    }
  }


}
