import { StandingsPageComponent } from './components/standings-page/standings-page.component';
import { TipsPageComponent } from './components/tips-page/tips-page.component';
import { MatchesPageComponent } from './components/matches-page/matches-page.component';
import { TeamLandingComponent } from './components/team-landing/team-landing.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { TeamsComponent } from './components/teams/teams.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'teams',component:TeamsComponent},
  {path:'team',component:TeamLandingComponent},
  {path:'matches',component:MatchesPageComponent},
  {path:'tips',component:TipsPageComponent},
  {path:'standings',component:StandingsPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
