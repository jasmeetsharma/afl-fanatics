import { TeamsComponent } from './components/teams/teams.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamCardComponent } from './components/team-card/team-card.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { NextGamesComponent } from './components/next-games/next-games.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamCardComponent,
    TeamsComponent,
    HeaderComponent,
    FooterComponent,
    MainContainerComponent,
    NextGamesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
