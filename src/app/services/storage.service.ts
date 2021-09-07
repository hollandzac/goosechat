import { Injectable } from '@angular/core';


export enum Role {
  User = "user",
  SuperAdmin = "superadmin",
  GroupAdmin = "groupadmin",
  GroupAssistant = "groupassis"
}
export interface Channel {
  id:number
  name: string
  users: Array<number>
}
export interface Group extends Channel {
  id: number
  channels: Array<Channel>
}

export interface User {
  username: string
  email: string
  id: number
  role: Role
}


@Injectable({
  providedIn: 'root'
})

export class StorageService {
  public groups: Array<Group> = []
  public users: Array<User> = []

  constructor() {
    this.getData()   
  }
  getData(){
    let users = localStorage.getItem('users')
    let groups = localStorage.getItem('groups')
    if(users !== null){
      this.users = JSON.parse(users)
    }
    if(groups !== null){
      this.groups = JSON.parse(groups)
    }
  }

  storeData(){
    localStorage.setItem("groups", JSON.stringify(this.groups))
    localStorage.setItem("users", JSON.stringify(this.users))
  }

  getUser(username: string): User | string{
    let user = this.users.find(user => user.username === username)
    if(user) {
      return user
    }
    return ""
  }

  newUser(user: User){
    this.users.push(user)
  }

  newChannel(channelID: number, groupID: number){
  }
  removeChannel(channelID: number, groupID: number){
  }

  newGroup(group: Group){  
  }
  removeGroup(groupid: number){}
  addUserToGroup(user:User, groupID: number){
  }
  removeUserFromGroup(userID: number, groupID: number){
  }
  addUserToChannel(user:User, channelID: number, groupID: number){
  }
  removeUserFromChannel(userID: number, channelID: number, groupID: number){
  }
  setUserRole(userID: number, role: Role){
    
  }





}
