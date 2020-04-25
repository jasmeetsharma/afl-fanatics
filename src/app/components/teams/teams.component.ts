import { DataService } from '../../services/data.service';
import { Team } from '../../models/team';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Observable<Team[]>;
  selectTeam:Team;
  teamSelected:boolean = false;
  constructor(private dataService :DataService) { }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams() : void{
   this.teams=this.dataService.getTeams();
  }

}
