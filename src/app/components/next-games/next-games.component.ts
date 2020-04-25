import { Team } from './../../models/team';
import { Game } from './../../models/game';
import { DataService } from '../../services/data.service';
import { Component, OnInit, Input } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-next-games',
  templateUrl: './next-games.component.html',
  styleUrls: ['./next-games.component.css']
})
export class NextGamesComponent implements OnInit {
  nextGames: Game[];
  selectedTeam: Team;
  allTeams: Team[];
  myGames: Game[];
  previousGames : Game[];
  nextGamesFlag :boolean = false;
  lastGamesFlag : boolean = false;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.selectedTeam = window.history.state.data;
    this.dataService.getTeams().subscribe(res => {
      this.allTeams = res;
    });
    this.dataService.getGames()
    .subscribe(res => {
      this.myGames = res.filter(g => g.ateamid == this.selectedTeam.id || g.hteamid == this.selectedTeam.id);
      let pDate = new Date();
      pDate.setFullYear(2019);
      this.nextGames = this.myGames.filter(g => Date.parse(g.date) > Date.parse(pDate.toString()));
      this.previousGames = this.myGames.filter(g => Date.parse(g.date) < Date.parse(pDate.toString()));
    });
    //this.getNextGames();
  }

  getNextGames(): void {
    // let pDate = new Date();
    // pDate.setFullYear(2019);
    // this.nextGames = this.myGames.filter(g => Date.parse(g.date) > Date.parse(pDate.toString()));
    this.lastGamesFlag=false;
    this.nextGamesFlag=true;
  }

  getTeam(tid: number) {
    let tt = this.allTeams.filter(t => t.id == tid);
    return tt[0];
  }

  getPreviousGames(): void {
    //let pDate = new Date();
    //pDate.setFullYear(2019);
    //this.previousGames = this.myGames.filter(g => Date.parse(g.date) < Date.parse(pDate.toString()));
    this.nextGamesFlag=false;
    this.lastGamesFlag=true;
  }

}
