import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from "socket.io-client";

const SERVER_URL = 'http://localhost:3000'
@Injectable({
  providedIn: 'root'
})

/**
 * Handles socket IO connections and events
 */
export class SocketService {
  private socket: Socket = io(SERVER_URL)
  constructor(){}
  

  public initSocket():void {
    this.socket.on('connect', () => {
      console.log("IS connected:" + this.socket.connected)
    })
  }
  public joinChannel(channel_Id: string, user_id: string):void {
    this.socket.emit("joinChannel", user_id , channel_Id,() => {
      console.log("JOINED")
    })
  }
  public send(message: string):void {
    this.socket.emit('message', message)
    console.log("still connected:" + this.socket.id)
  }

  public onMessage(): Observable<any> {
    let observable = new Observable(observer =>{
      this.socket.on('message', (data:string) =>
        observer.next(data))
    })
    return observable
  }
}
