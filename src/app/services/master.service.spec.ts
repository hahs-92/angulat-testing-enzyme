// import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
//service
import { ValueService } from './value.service';
//mocks
import { FakeValueService } from './value-fake.service';

fdescribe('MasterService', () => {
  let service: MasterService;

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(MasterService);
    // //sin ayuda de angular
    // service = new MasterService(new ValueService());
  });

  it('should be created', () => {
    const valueService = new ValueService();
    service = new MasterService(new ValueService());
    expect(service).toBeTruthy();
  });

  // este prueba normalmente no se usa, se utiliza mocks
  it('should return "myValue " from the real service', () => {
    const valueService = new ValueService();
    service = new MasterService(new ValueService());
    expect(service.getValue()).toBe('myValue');
  });

  // esta manera tampoco es muy recomendada por temas de escabilidad
  it('should return "fake value" from the fake service', () => {
    // con fake
    const valueService = new FakeValueService();
    service = new MasterService(valueService as unknown as ValueService);
    expect(service.getValue()).toBe('fake value');
  });

  //mejor opcion
  it('should return "fake value" from the fake service with object', () => {
    // con fake
    const valueService = { getValue: () => 'fake value' };
    service = new MasterService(valueService as ValueService);
    expect(service.getValue()).toBe('fake value');
  });
});
