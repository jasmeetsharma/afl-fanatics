import { map, switchMap } from 'rxjs/operators';
import { Tip } from '../../models/tip';
import { Game } from '../../models/game';
import { Observable, of } from 'rxjs';
import { Team } from 'src/app/models/team';
import { DataService } from '../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tips-page',
  templateUrl: './tips-page.component.html',
  styleUrls: ['./tips-page.component.css']
})
export class TipsPageComponent implements OnInit {
  favTeam :Team;
  nextGames : Observable<Game[]>;
  allGames : Game[];
  favTeamId:any = "0";
  tipSourceId : any = 1;
  tips : Tip[];
  tipsO : Observable<Tip[]>;
  tipSources : Observable<any[]>;
  teams : Team[];
  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.tipSources = this.dataService.getTipSources();
    this.dataService.getTip().pipe(
      switchMap(res =>{
        this.tips=res;
        return this.dataService.getTeams();
      })
    ).subscribe(res=>{
      this.teams = res;
      this.tips.map(r=>{
        r.awayTeam=this.getTeam(r.ateamid);
        r.homeTeam=this.getTeam(r.hteamid);
        r.date=r.date.replace(/-/g, "/");
      });
      if(window.history.state.data){
        this.favTeam = window.history.state.data;
        this.favTeamId = this.favTeam.id;
      }
      this.updateSelectedTeam(this.favTeamId,this.tipSourceId)
    })
  }

  /**
   * 
   * @param favTeamId  : id of the favorite team (optional)
   * @param tipsId : source from which tips are required
   * if the only tipsId is provided then it will return predictions for all
   * the games in Round 20.
   * if both the parameters are provided then it will return the prediction
   * for the next game of users's favorite team.
   */

  updateSelectedTeam(favTeamId? : any,tipsId? : any){
    if (favTeamId == "0") {
      this.favTeamId = undefined;
    }else{
      this.favTeamId = favTeamId;
    }
    if (tipsId != "0") {
      this.tipSourceId = tipsId;
    } 
    this.tipsO = of(this.tips.filter((item) =>{
      if(this.favTeamId){
          return item['sourceid']==this.tipSourceId && (item['ateamid'] == this.favTeamId || item['hteamid'] == this.favTeamId);
      }else{
          return item['sourceid']==this.tipSourceId;
      }
    }));
  }

  getTeam(tid: number) {
    let tt = this.teams.filter(t => t.id == tid);
    return tt[0];
  }
}
