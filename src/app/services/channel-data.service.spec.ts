import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ChannelDataService } from './channel-data.service';

describe('ChannelDataService', () => {
  let service: ChannelDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ChannelDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
