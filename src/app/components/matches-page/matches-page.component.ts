import { Team } from 'src/app/models/team';
import { DataService } from '../../services/data.service';
import { Game } from '../../models/game';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matches-page',
  templateUrl: './matches-page.component.html',
  styleUrls: ['./matches-page.component.css']
})
export class MatchesPageComponent implements OnInit {
  favTeam :Team;
  favTeamId : any;
  rivalTeamId : any;
  nextGames : Observable<Game[]>;
  allGames : Game[];
  previousGames : Observable<Game[]>;
  teams : Observable<Team[]>;
  prevGames : boolean = true;
  nextG : boolean = true;
  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    if(window.history.state.data){
      this.favTeam = window.history.state.data;
      this.favTeamId = this.favTeam.id
      this.updateSelectedTeam(this.favTeamId);
    }else{
      this.updateSelectedTeam();
    }
    this.previousGames = this.dataService.getPreviousGames(this.allGames);
    this.nextGames = this.dataService.getNextGames(this.allGames);
    this.teams = this.dataService.getTeams();
  }

  updateSelectedTeam(favTeamId? : any,rivalTeamId? :any){
    if (favTeamId == "0") {
      this.favTeamId = undefined;
    }else{
      this.favTeamId = favTeamId;
    }
    if(rivalTeamId == "0"){
      this.rivalTeamId = undefined;
    }else{
      this.rivalTeamId = rivalTeamId;
    }
    this.dataService.getGameDetails(this.favTeamId,this.rivalTeamId).subscribe(res=>{
      this.allGames = res;
      this.previousGames = this.dataService.getPreviousGames(this.allGames);
      this.nextGames = this.dataService.getNextGames(this.allGames);
    });
  } 

  updateDisplaySelection(disSection : any){
    if(disSection == "0"){
      this.prevGames = true;
      this.nextG = true;
    }else if(disSection == "1"){
      this.prevGames = false;
      this.nextG = true;
    }else{
      this.nextG = false;
      this.prevGames = true;
    }
  }

}
