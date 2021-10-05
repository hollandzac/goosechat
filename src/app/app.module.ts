import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GroupsComponent } from './groups/groups.component';
import { ChannelComponent } from './channel/channel.component';
import { HttpClientModule } from '@angular/common/http';
import { GroupComponent } from './group/group.component';
import { AddGroupComponent } from './groups/add-group/add-group.component';
import { UpdateGroupComponent } from './groups/update-group/update-group.component';
import { UpdateChannelComponent } from './group/update-channel/update-channel.component';
import { AddChannelComponent } from './group/add-channel/add-channel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    GroupsComponent,
    GroupComponent,
    AddGroupComponent,
    UpdateGroupComponent,
    UpdateChannelComponent,
    AddChannelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
