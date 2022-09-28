import { TestBed } from '@angular/core/testing';

import { WelcomedetailsService } from './welcomedetails.service';

describe('WelcomedetailsService', () => {
  let service: WelcomedetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WelcomedetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
