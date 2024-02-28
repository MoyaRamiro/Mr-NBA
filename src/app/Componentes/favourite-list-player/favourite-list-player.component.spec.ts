import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteListPlayerComponent } from './favourite-list-player.component';

describe('FavouriteListPlayerComponent', () => {
  let component: FavouriteListPlayerComponent;
  let fixture: ComponentFixture<FavouriteListPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavouriteListPlayerComponent]
    });
    fixture = TestBed.createComponent(FavouriteListPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
