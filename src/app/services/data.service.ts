import { Team } from '../models/team';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Game } from '../models/game';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private teamsUrl = 'https://api.squiggle.com.au/?q=teams';
  private gamesUrl = 'https://api.squiggle.com.au/?q=games;year=2019';

  constructor(private http:HttpClient) {
   }

  getTeams() : Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsUrl)
    .pipe(map(res => res['teams'])
    );
  }

  getGames() : Observable<Game[]> {
    return this.http.get<Game[]>(this.gamesUrl) 
      .pipe(map(res => res['games'])
      );

  }

}
