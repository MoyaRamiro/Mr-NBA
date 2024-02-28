import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteListComponent } from './favourite-list-team.component';

describe('FavouriteListComponent', () => {
  let component: FavouriteListComponent;
  let fixture: ComponentFixture<FavouriteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavouriteListComponent]
    });
    fixture = TestBed.createComponent(FavouriteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
