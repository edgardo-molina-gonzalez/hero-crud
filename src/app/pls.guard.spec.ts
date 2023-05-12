import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { plsGuard } from './pls.guard';

describe('plsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => plsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
