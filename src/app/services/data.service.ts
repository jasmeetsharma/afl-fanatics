import { Tip } from './../models/tip';
import { Team } from '../models/team';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError, map, tap, shareReplay,filter } from 'rxjs/operators';
import { Game } from '../models/game';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private teamsUrl = 'https://api.squiggle.com.au/?q=teams';
  private gamesUrl = 'https://api.squiggle.com.au/?q=games;year=2019';
  private tipsUrl  = 'https://api.squiggle.com.au/?q=tips;year=2019;round=20';
  private tipsSourcesUrl  = 'https://api.squiggle.com.au/?q=sources';
  private cacheTeams$:Observable<Team[]>;
  private cacheGames$:Observable<Game[]>;
  private cacheTipSources$ : Observable<any[]>;
  private cacheTips$ : Observable<any[]>;

  constructor(private http:HttpClient) {
   }

   getTeams() : Observable<Team[]> {
    if (!this.cacheTeams$) {
      this.cacheTeams$ = this.getTeamsNoCache().pipe(
        shareReplay(1)
      );
    }
    return this.cacheTeams$;
   }

  getTeamsNoCache() : Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsUrl)
    .pipe(map(res => res['teams'])
    );
  }

  getGames() : Observable<Game[]> {
    let l=localStorage.getItem('allGames');
    if(l != null){
      this.cacheGames$ = of(JSON.parse(l));
    }
    if (!this.cacheGames$) {
      this.cacheGames$ = this.getGamesNoCache().pipe(
        shareReplay(1)
      );
    }
    return this.cacheGames$;
   }
  getGamesNoCache() : Observable<Game[]> {
    return this.http.get<Game[]>(this.gamesUrl) 
      .pipe(map(res => res['games']));
  }

  getPreviousGames(allGames : Game[]): Observable<Game[]>{
    return of(allGames.filter(a=>a['round']<20).sort((a,b)=>Date.parse(b.date) - Date.parse(a.date)));
  }

  getNextGames(allGames : Game[]): Observable<Game[]>{
    return of(allGames.filter(a=>a['round']>=20).sort((a,b)=>Date.parse(a.date) - Date.parse(b.date)));
  }

  /**
 * 
 * @param favTeamId : id of the favorite team(optional)
 * @param rivalTeamId id of the rival team(optional)
 * if both params are present:
 *    it will return all the games played as well as upcoming games
 *    between these two teams in this season(2019).
 * if only favTeamId is present:
 *    it  will return all the games played as well as upcoming games
 *    of the favorite team.
 * if none of the params present:
 *    it will return all the games of the season 2019.(played as well as upcoming)
 */  
getGameDetails(favTeamId ? :number,rivalTeamId ? :number) : Observable<Game[]>{
 return this.getGames() 
 .pipe(map((res)=>res
    .filter((item)=>{
      if(favTeamId && rivalTeamId){
        return (item['hteamid'] == favTeamId || item['ateamid'] == favTeamId) &&
                (item['hteamid'] == rivalTeamId || item['ateamid'] == rivalTeamId)
      }else if(favTeamId){
        return (item['hteamid'] == favTeamId || item['ateamid'] == favTeamId) 
      }
      return item;
    }))
  )
}

/**
   * Fetch all the Sources for the tips.
   */
  getTipSourcesNoCache():Observable<any[]>{
    return this.http.get<any[]>(this.tipsSourcesUrl)
    .pipe(map(res=>res['sources'])
    );
  }
  getTipSources() : Observable<any[]> {
    if (!this.cacheTipSources$) {
      this.cacheTipSources$ = this.getTipSourcesNoCache().pipe(
        shareReplay(1)
      );
    }
    return this.cacheTipSources$;
   }

/**
   * Return all the tips for round 20.
   */

  getTipsNoCache() : Observable<Tip[]> {
    return this.http.get<Tip[]>(this.tipsUrl)
    .pipe(map(res => res['tips']));
  }
  getTip() : Observable<Tip[]> {
    if (!this.cacheTips$) {
      this.cacheTips$ = this.getTipsNoCache().pipe(
        shareReplay(1)
      );
    }
    return this.cacheTips$;
   }

}
