import { Observable } from 'rxjs';
import { Game } from './../../models/game';
import { DataService } from './../../services/data.service';
import { Team } from './../../models/team';
import { Component, OnInit, Input, } from '@angular/core';


@Component({
  selector: 'app-team-landing',
  templateUrl: './team-landing.component.html',
  styleUrls: ['./team-landing.component.css']
})
export class TeamLandingComponent implements OnInit {
  team:Team;
  nextGames : Observable<Game[]>;
  allGames : Game[];
  previousGames : Observable<Game[]>;
  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.team = window.history.state.data;
    this.nextGames=this.dataService.getGameDetails(this.team.id);
    //this.nextGames= JSON.parse(localStorage.getItem('allGames'));
  }

}
