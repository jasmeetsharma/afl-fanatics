import { Tip } from './../../models/tip';
import { Observable } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { Game } from './../../models/game';
import { Component, OnInit,Input } from '@angular/core';
import {PanelType} from './../../models/PanelType';
import { Team } from 'src/app/models/team';
@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.css']
})
export class GamePanelComponent implements OnInit {
  @Input() numOfGames : number;
  @Input() inputPanelType : number;
  @Input() games : Observable<Game[]>;
  @Input() tips : Observable<Tip[]>;
  @Input() teams : Team[];
  result : PanelType = PanelType.result;
  next : PanelType = PanelType.next;
  tip : PanelType = PanelType.tip;
  constructor() { }

  ngOnInit(): void {
  }

}
