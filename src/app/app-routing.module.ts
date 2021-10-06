import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { LoginComponent } from './login/login.component';
import { ChannelComponent } from './channel/channel.component';
import { GroupComponent } from './group/group.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuardGuard] },
  { path: 'register', component: RegisterComponent },
  {
    path: 'group/:group_Id/channel/:channel_Id',
    component: ChannelComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'group/:group_Id',
    component: GroupComponent,
    canActivate: [AuthGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardGuard]
})
export class AppRoutingModule {}
