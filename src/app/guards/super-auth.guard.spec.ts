import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SuperAuthGuard } from './super-auth.guard';

describe('SuperAuthGuard', () => {
  let guard: SuperAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientModule],
    });
    guard = TestBed.inject(SuperAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
