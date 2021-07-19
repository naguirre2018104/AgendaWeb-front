import { TestBed } from '@angular/core/testing';

import { RestContactService } from './rest-contact.service';

describe('RestContactService', () => {
  let service: RestContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
