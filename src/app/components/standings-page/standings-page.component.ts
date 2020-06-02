import { Component, OnInit } from '@angular/core';
import { Observable, of, observable } from 'rxjs';
import { Standing } from 'src/app/models/standing';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-standings-page',
  templateUrl: './standings-page.component.html',
  styleUrls: ['./standings-page.component.css']
})
export class StandingsPageComponent implements OnInit {

  standings: Observable<Standing[]>
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getStandings();
 
  }

  getStandings(): void{
    this.standings=this.dataService.getStandings();
   }

}
