import { TestBed } from '@angular/core/testing';

import { FavouriteListService } from './favourite-list-pla.service';

describe('FavouriteListPlaService', () => {
  let service: FavouriteListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouriteListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
