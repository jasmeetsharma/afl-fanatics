import { Location } from './../../models/location';
import { NavigationService } from './../../services/navigation.service';
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
  nearestGame : Observable<Game[]>;
  isNearest : boolean = false;
  currentLocation : String;
  constructor(private dataService:DataService,private navigationService:NavigationService) { }

  ngOnInit(): void {
    this.getGamesInfo();
    this.navigationService.getNearestGame();
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

  getNearGame(){
    this.nearestGame=of(this.navigationService.getNearestLocation());
    this.isNearest = true;
  }
}
