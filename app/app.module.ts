import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { TournamentModule } from './tournament/tournament.module'

import { AppComponent } from './app.component/app.component';
import { WelcomeComponent } from './home/welcome.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
    TournamentModule],
  declarations: [
    AppComponent,
    WelcomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
