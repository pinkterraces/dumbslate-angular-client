import { TestBed } from '@angular/core/testing';

import { UserRegistrationService } from './fetch-api-data.service';
import { UserLoginService } from './fetch-api-data.service';

describe('UserRegistrationService', () => {
  let service: UserRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('UserLoginService', () => {
  let service: UserLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});