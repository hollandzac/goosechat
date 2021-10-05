import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ChannelDataService } from 'src/app/services/channel-data.service';
import { Channel } from 'src/app/services/group-data.service';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.css']
})
export class AddChannelComponent implements OnInit {
  @Input() group_Id:string
  public newChannelName: string = '';
  public newDescription: string = '';
  public channelError: string | null = null;
  @Output("getGroup") getGroup: EventEmitter<any> = new EventEmitter();
  constructor(private channelsDataService: ChannelDataService) { }

  ngOnInit(): void {
  }

   //Creates a channel from form import then sends a post request to server
   addNewChannel() {
    let newChannel: Channel = {
      name: this.newChannelName,
      description: this.newDescription,
      users: [],
    };
    //Post new channel if res status 4xx display error
    this.channelsDataService.addChannel(this.group_Id,newChannel).subscribe(
      (res) => {
        this.channelError = null;
        this.getGroup.emit();
      },
      (error) => {
        console.log(error.status);
        if (error.status === 409) {
          this.channelError = 'Conflict channel with that name exists';
        }
      }
    );
  }

}
