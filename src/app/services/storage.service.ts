import { Injectable } from '@angular/core';
export enum Role {
  User = 'user',
  SuperAdmin = 'superadmin',
  GroupAdmin = 'groupadmin',
  GroupAssistant = 'groupassis',
}

export interface Channel {
  name: string;
  users: Array<number>;
}
export interface Group extends Channel {
  channels: Array<Channel>;
}

export interface User {
  username?: string;
  email?: string;
  id?: number;
  role?: Role;
}
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public groups: Array<Group> = [];
  public users: Array<User> = [
    {
      username: 'super',
      email: 'super@goosechat.com',
      id: 1,
      role: Role.SuperAdmin,
    },
  ];

  constructor() {}
  getData() {
    let users = localStorage.getItem('users');
    let groups = localStorage.getItem('groups');
    if (users !== null) {
      this.users = JSON.parse(users);
    }
    if (groups !== null) {
      this.groups = JSON.parse(groups);
    }
  }

  storeData() {
    localStorage.setItem('groups', JSON.stringify(this.groups));
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getUser(username: string): User | string {
    let user = this.users.find((user) => user.username === username);
    if (user) {
      return user;
    }
    return '';
  }

  newUser(user: User) {
    this.users.push(user);
  }

  newChannel(channelName: string, group: Group) {
    let idxGr = group.channels.findIndex(
      (channel) => channel.name === channelName
    );
    if (idxGr === -1) {
      let newChannel: Channel = {
        name: channelName,
        users: [],
      };
      group.channels.push(newChannel);
      return false;
    }
    return true;
  }
  removeChannel(channel: Channel, group: Group) {
    let idxCh = group.channels.indexOf(channel);
    group.channels.splice(idxCh, 1);
  }

  newGroup(groupName: string): boolean {
    let idxGr = this.groups.findIndex((group) => group.name === groupName);
    if (idxGr === -1) {
      let newGroup: Group = {
        name: groupName,
        users: [],
        channels: [],
      };
      this.groups.push(newGroup);
      return false;
    }
    return true;
  }

  removeGroup(group: Group) {
    this.groups.splice(this.groups.indexOf(group));
  }

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
