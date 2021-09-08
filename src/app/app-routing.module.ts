import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component'
import { LoginComponent } from './login/login.component';
import { ChannelComponent } from './channel/channel.component';

const routes: Routes = [
  {path:'groups', component: GroupsComponent},
  {path:'channel/:groupName/:channelName', component: ChannelComponent},
  {path: '', component: LoginComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
