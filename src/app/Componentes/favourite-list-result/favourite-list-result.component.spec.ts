import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteListResultComponent } from './favourite-list-result.component';

describe('FavouriteListResultComponent', () => {
  let component: FavouriteListResultComponent;
  let fixture: ComponentFixture<FavouriteListResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavouriteListResultComponent]
    });
    fixture = TestBed.createComponent(FavouriteListResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
