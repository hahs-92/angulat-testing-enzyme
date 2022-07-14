import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      //agregamos provider
      providers: [ValueService],
    });
    service = TestBed.inject(ValueService);

    //sin ayuda de angular
    // service = new ValueService();
  });

  it('should be create', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', () => {
    it('should return myValue', () => {
      expect(service.getValue()).toBe('myValue');
    });
  });

  describe('Test for setValue', () => {
    it('should return newValue', () => {
      service.setValue('newValue');
      expect(service.getValue()).toBe('newValue');
    });
  });

  describe('Test for getPromiseValue', () => {
    it('should return "promise value" from promise ', (doneFn) => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe('promise value');
        doneFn(); //indicarle donde termina la prueba
      });
    });

    it('should return "promise value" from promise with async ', async () => {
      const value = await service.getPromiseValue();
      expect(value).toBe('promise value');
    });
  });

  describe('Test for getObservableValue', () => {
    it('should return "observable value" from observable ', () => {
      service.getObservableValue().subscribe((value) => {
        expect(value).toBe('observable value');
      });
    });
  });
});
