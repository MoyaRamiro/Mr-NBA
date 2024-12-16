import { TestBed } from '@angular/core/testing';

import { FavouriteListResultsService } from './favourite-list-results.service';

describe('FavouriteListResultsService', () => {
  let service: FavouriteListResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouriteListResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
