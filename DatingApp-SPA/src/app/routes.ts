import { MemberListReslover } from './_resolvers/member-List.resolver';
import { MemberDetailReslover } from './_resolvers/member-detail.resolver';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import {Routes} from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-list/member-detail/member-detail.component';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {
      path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
        {path: 'members', component: MemberListComponent, resolve: {users: MemberListReslover}},
        {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailReslover}},
        {path: 'messages', component: MessagesComponent},
        {path: 'lists', component: ListsComponent},
      ]
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];
