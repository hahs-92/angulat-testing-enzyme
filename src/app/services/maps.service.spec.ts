import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

describe('MapsService', () => {
  let service: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapsService],
    });
    service = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test for getCurrentPosition', () => {
    it('should save the center', () => {
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
        (successFn) => {
          const mockGeolocation = {
            coords: {
              accuracy: 0,
              altitude: 0,
              altitudeAccuracy: 0,
              latitude: 1000,
              longitude: 1000,
              heading: 0,
              speed: 0,
            },
            timestamp: 0,
          };
          successFn(mockGeolocation);
        }
      );

      service.getCurrentPosition();
      expect(service.center.lat).toEqual(1000);
      expect(service.center.lng).toEqual(1000);
    });
  });
});
