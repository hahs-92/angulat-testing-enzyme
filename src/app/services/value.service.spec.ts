// import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;
  beforeEach(() => {
    service = new ValueService();
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(ValueService);
  });

  it('should be create', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', () => {
    fit('should return myValue', () => {
      expect(service.getValue()).toBe('myValue');
    });
  });

  describe('Test for setValue', () => {
    fit('should return newValue', () => {
      service.setValue('newValue');
      expect(service.getValue()).toBe('newValue');
    });
  });

  describe('Test for getPromiseValue', () => {
    fit('should return "promise value" from promise ', (doneFn) => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe('promise value');
        doneFn(); //indicarle donde termina la prueba
      });
    });

    fit('should return "promise value" from promise with async ', async () => {
      const value = await service.getPromiseValue();
      expect(value).toBe('promise value');
    });
  });

  describe('Test for getObservableValue', () => {
    fit('should return "observable value" from observable ', () => {
      service.getObservableValue().subscribe((value) => {
        expect(value).toBe('observable value');
      });
    });
  });
});
