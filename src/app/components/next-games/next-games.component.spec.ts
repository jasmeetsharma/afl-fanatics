import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextGamesComponent } from './next-games.component';

describe('NextGamesComponent', () => {
  let component: NextGamesComponent;
  let fixture: ComponentFixture<NextGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
