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
import { HomepageComponent } from './components/homepage/homepage.component';
import { GamePanelComponent } from './components/game-panel/game-panel.component';
import { TeamLandingComponent } from './components/team-landing/team-landing.component';
import { MatchesPageComponent } from './components/matches-page/matches-page.component';
import { TipsPageComponent } from './components/tips-page/tips-page.component';
import { StandingsPageComponent } from './components/standings-page/standings-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamCardComponent,
    TeamsComponent,
    HeaderComponent,
    FooterComponent,
    MainContainerComponent,
    HomepageComponent,
    GamePanelComponent,
    TeamLandingComponent,
    MatchesPageComponent,
    TipsPageComponent,
    StandingsPageComponent
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
