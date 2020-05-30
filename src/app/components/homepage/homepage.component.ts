import { PanelType } from './../../models/PanelType';
import { Team } from './../../models/team';
import { map, switchMap, filter } from 'rxjs/operators';
import { Game } from './../../models/game';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Observable,of } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  allGames:Game[];
  previousGames:Observable<Game[]>;
  nextGames:Observable<Game[]>;
  teams:Team[];
  panelType:PanelType ;
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.getGamesInfo();
  }

  getGamesInfo():void{
    this.dataService.getGames().pipe(
      switchMap(res =>{
        this.allGames=res;
        return this.dataService.getTeams();
      })
    ).subscribe(res=>{
      this.teams=res;
      this.allGames.map(r=>{
          r.awayTeam=this.getTeam(r.ateamid);
          r.homeTeam=this.getTeam(r.hteamid);
        });
        localStorage.setItem("allGames",JSON.stringify(this.allGames));
        this.previousGames= this.dataService.getPreviousGames(this.allGames);
        this.nextGames = this.dataService.getNextGames(this.allGames);
    })
  }

  getTeam(tid: number) {
    let tt = this.teams.filter(t => t.id == tid);
    return tt[0];
  }
}
