import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
//service
import { ValueService } from './value.service';
//mocks
import { FakeValueService } from './value-fake.service';

fdescribe('MasterService', () => {
  let service: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);

    TestBed.configureTestingModule({
      //injectamos el modulo
      providers: [
        MasterService,
        { provide: ValueService, useValue: spy }, //le indicamos que use esete spy
      ],
    });

    service = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(
      ValueService
    ) as jasmine.SpyObj<ValueService>;

    // //sin ayuda de angular
    // service = new MasterService(new ValueService());
  });

  /*

  it('should be created', () => {
    // const valueService = new ValueService();
    // service = new MasterService(valueService);
    expect(service).toBeTruthy(); // con l ayuda de angular no necesitamos crear la intancia de valueService
  });

  // este prueba normalmente no se usa, se utiliza mocks
  it('should return "myValue " from the real service', () => {
    // const valueService = new ValueService();
    // service = new MasterService(valueService);
    expect(service.getValue()).toBe('myValue');
  });

  // esta manera tampoco es muy recomendada por temas de escabilidad
  it('should return "fake value" from the fake service', () => {
    // con fake
    // const valueService = new FakeValueService();
    // service = new MasterService(valueService as unknown as ValueService);
    expect(service.getValue()).toBe('fake value');
  });

  */

  //mejor opcion
  //sin l ayuda de angular
  /*
  it('should call to getValue from valueService', () => {
    // con fake
    const valueServiceSpy = jasmine.createSpyObj<ValueService>('ValueService', [
      'getValue',
    ]);
    valueServiceSpy.getValue.and.returnValue('fake value');
    service = new MasterService(valueServiceSpy);

    expect(service.getValue()).toBe('fake value'); // en este caso no importa lo que retorna
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
  */

  // conla ayuda de angular
  it('should call to getValue from valueService', () => {
    valueServiceSpy.getValue.and.returnValue('fake value');

    expect(service.getValue()).toBe('fake value'); // en este caso no importa lo que retorna
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
});
