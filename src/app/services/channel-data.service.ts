import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Channel } from './group-data.service';

const groupsApiUrl: string = 'http://localhost:3000/api/groups/'

@Injectable({
  providedIn: 'root'
})
export class ChannelDataService {

  constructor(private http:HttpClient) { }

  public getAllChannels(group_Id:string) {
    return this.http.get<any>(`${groupsApiUrl + group_Id}/channels`)
  }
  public getChannel(group_Id:string, channel_Id: string) {
    return this.http.get<any>(`${groupsApiUrl + group_Id}/channels/${channel_Id}`)
  }
  public deleteChannel(group_Id:string, channel_Id: string) {
    return this.http.delete<any>(`${groupsApiUrl + group_Id}/channels/${channel_Id}`)
  }
  public addChannel(group_Id:string, newChannel:Channel) {
    return this.http.post<any>(`${groupsApiUrl + group_Id}/channels`, newChannel)
  }
  public updateChannel(group_Id:string, channel_Id: string, channel:Channel){
    return this.http.put<any>(`${groupsApiUrl + group_Id}/channels/${channel_Id}`, channel)
  }
  public addUserChannel(group_Id:string, channel_Id: string, username:string){
    return this.http.put<any>(`${groupsApiUrl + group_Id}/channels/${channel_Id}/users`, {username:username})
  }
  public removeUserChannel(group_Id:string, channel_Id: string, username:string){
    return this.http.delete<any>(`${groupsApiUrl + group_Id}/channels/${channel_Id}/users/${username}`)
  }

  public getChatHistory(group_Id:string, channel_Id: string){
    return this.http.get<any>(`${groupsApiUrl + group_Id}/channels/${channel_Id}/messages`)
  }
}
