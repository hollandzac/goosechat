import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component'
import { LoginComponent } from './login/login.component';
import { ChannelComponent } from './channel/channel.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [
  {path:'groups', component: GroupsComponent},
  {path:'group/:group_Id', component: GroupComponent},
  {path:'channel/:channelId', component: ChannelComponent},
  {path: '', component: LoginComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
