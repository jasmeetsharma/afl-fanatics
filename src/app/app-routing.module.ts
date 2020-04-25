import { TeamsComponent } from './components/teams/teams.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NextGamesComponent } from './components/next-games/next-games.component';


const routes: Routes = [
  {path:'nextgames', component:NextGamesComponent},
  {path:'',component:TeamsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
