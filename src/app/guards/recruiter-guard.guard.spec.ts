import { TestBed } from '@angular/core/testing';

import { RecruiterGuardGuard } from './recruiter-guard.guard';

describe('RecruiterGuardGuard', () => {
  let guard: RecruiterGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RecruiterGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
