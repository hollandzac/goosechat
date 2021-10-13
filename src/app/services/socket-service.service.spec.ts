import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SocketService } from './socket-service.service';

describe('SocketServiceService', () => {
  let service: SocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(SocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
