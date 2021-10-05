import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'


///
const groupsApiUrl: string = 'http://localhost:3000/api/groups/'
export interface Channel {
  _id?: string,
  name: string;
  description: string | null,
  users: Array<string>;
}
export interface Group{
  _id?: string,
  groupName: string,
  description: string | null,
  users: Array<string>
  channels: Array<Channel>;
  assistants: Array<string>
}

export interface User {
  _id?: string
  username: string;
  superAdmin: boolean;
  groupAdmin: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class GroupDataService {

  constructor(private http:HttpClient) {}

  public getAllGroups() {
    return this.http.get<any>(groupsApiUrl)
  }
  public getGroup(id: string) {
    return this.http.get<Group>(groupsApiUrl + id)
  }
  public deleteGroup(id: string) {
    return this.http.delete<any>(groupsApiUrl + id)
  }
  public addGroup(newGroup: Group) {
    return this.http.post<any>(groupsApiUrl, newGroup)
  }
  public updateGroup(id: string, group:Group){
    return this.http.put<any>(groupsApiUrl + id, group)
  }

  // private errorHandler(error: HttpErrorResponse){
  //   if(error.status === 0) {
  //     console.error("And error occured:", error.error)
  //   } else if(error.status == 409) {
  //     return throwError("Group with that name exists")
  //     console.error("Conflict group with that name exsits")
  //   }
  // }
  
  // storeData() {
  //   localStorage.setItem('groups', JSON.stringify(this.groups));
  //   localStorage.setItem('users', JSON.stringify(this.users));
  // }

  // getUser(username: string): User | undefined{
  //   let user = this.users.find((user) => user.username === username);
  //   return user
  // }

  // newUser(user: User) {
  //   this.users.push(user);
  // }

  // newChannel(channelName: string, group: Group) {
  //   let idxGr = group.channels.findIndex(
  //     (channel) => channel.name === channelName
  //   );
  //   if (idxGr === -1) {
  //     let newChannel: Channel = {
  //       name: channelName,
  //       users: [],
  //       messages: []
  //     };
  //     group.channels.push(newChannel);
  //     return false;
  //   }
  //   return true;
  // }
  // getChannel(groupName: string, channelName: string): Channel{
  //   let idxGr = this.groups.findIndex(
  //     (group) => group.name === groupName
  //   );
  //   let idxCh = this.groups[idxGr].channels.findIndex(
  //     (channel) => channel.name === channelName
  //   );
  //   return this.groups[idxCh].channels[idxGr]
  // }
  // removeChannel(channel: Channel, group: Group) {
  //   let idxCh = group.channels.indexOf(channel);
  //   group.channels.splice(idxCh, 1);
  // }

  // newGroup(groupName: string): boolean {
  //   let idxGr = this.groups.findIndex((group) => group.name === groupName);
  //   if (idxGr === -1) {
  //     let newGroup: Group = {
  //       name: groupName,
  //       users: [],
  //       channels: [],
  //     };
  //     this.groups.push(newGroup);
  //     return false;
  //   }
  //   return true;
  // }

  // removeGroup(group: Group) {
  //   this.groups.splice(this.groups.indexOf(group));
  // }

  // addUserToGroup(userID: number, groupID: number) {
  //   this.groups[this.findGroupWithID(groupID)].users.push(userID);
  // }

  // removeUserFromGroup(userID: number, groupID: number): boolean {
  //   let idxGr = this.findGroupWithID(groupID);

  //   if (idxGr === -1) {
  //     return false;
  //   }
  //   let idxUs = this.groups[idxGr].users.indexOf(userID);
  //   this.groups[idxGr].users.splice(idxUs);

  //   this.groups[idxGr].channels.forEach((channel) => {
  //     if (channel !== null) {
  //       let idx = channel.users.indexOf(userID);
  //       channel.users.splice(idx);
  //     }
  //   });

  //   return true;
  // }

  // addUserToChannel(userId: number, channelID: number, groupID: number){
  //   let group = this.groups[this.findGroupWithID(groupID)]

  //   if(group.users.indexOf(userId) === -1){
  //     this.addUserToGroup(userId, groupID)
  //   }
  //   group.channels[this.findChannelWithID(channelID, group)].users.push(userId)
  // }

  // removeUserFromChannel(userID: number, channelID: number, groupID: number) {
  //   let group = this.groups[this.findGroupWithID(groupID)]
  //   let channel =  group.channels[this.findChannelWithID(channelID, group)]

  //   let idxUs =  channel.users.indexOf(userID)

  //   channel.users.splice(idxUs, 1)

  // }
  // setUserRole(userID: number, role: Role){
  //   this.users[this.users.findIndex(user => user.id === userID)].role = role
  // }

  // findGroupWithID(groupID: number): number {
  //   return this.groups.findIndex((group) => group.id === groupID);
  // }
  // findChannelWithID(channelID: number, group: Group): number{
  //   return group.channels.findIndex(channel => channel.id === channelID)
  // }
}
