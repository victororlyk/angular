import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';

const appRoutes: Routes = [
  {
    path: 'servers',
    component: ServersComponent,
    // canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: [
      { path: ':id', component: ServerComponent, resolve: { server: ServerResolver } },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] },
    ]
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      { path: ':id/:name', component: UserComponent },
    ]
  },
  { path: '', component: HomeComponent },
  // { path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'page not found' } },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ServersService, CanDeactivateGuard, ServerResolver],
  bootstrap: [AppComponent]
})
export class AppModule {
}
