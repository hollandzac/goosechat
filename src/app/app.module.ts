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
import { RegisterComponent } from './register/register.component';
import { MatIconModule } from "@angular/material/icon"
import { MatExpansionModule } from "@angular/material/expansion";
import { ManageUsersComponent } from './group/manage-users/manage-users.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component'

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
    ChannelComponent,
    RegisterComponent,
    ManageUsersComponent,
    ProfileComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
