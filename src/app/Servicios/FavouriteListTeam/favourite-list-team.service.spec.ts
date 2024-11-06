import { TestBed } from '@angular/core/testing';

import { FavouriteListService } from './favourite-list-team.service';

describe('FavouriteListService', () => {
  let service: FavouriteListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouriteListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
