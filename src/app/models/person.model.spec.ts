import { Person } from './person.model';

describe('Test for Person', () => {
  let person: Person;
  beforeEach(() => {
    person = new Person('Jess', 'Jhonson', 28, 54, 1.65);
  });

  it('attrs', () => {
    expect(person.name).toEqual('Jess');
    expect(person.lastName).toEqual('Jhonson');
    expect(person.age).toEqual(28);
    expect(person.weight).toEqual(54);
    expect(person.height).toEqual(1.65);
  });

  describe('Test for calcIMC', () => {
    it('should return a string: down', () => {
      person.weight = 40;
      person.height = 1.65;

      const rta = person.calcIMC();

      expect(rta).toEqual('down');
    });

    it('should return a string: normal', () => {
      person.weight = 55;
      person.height = 1.54;

      const rta = person.calcIMC();

      expect(rta).toEqual('normal');
    });

    it('should return a string: overweight', () => {
      person.weight = 60;
      person.height = 1.54;

      const rta = person.calcIMC();

      expect(rta).toEqual('overweight');
    });

    it('should return a string: overweight level 1', () => {
      person.weight = 68;
      person.height = 1.54;

      const rta = person.calcIMC();

      expect(rta).toEqual('overweight level 1');
    });

    it('should return a string: overweight level 2', () => {
      person.weight = 70;
      person.height = 1.54;

      const rta = person.calcIMC();

      expect(rta).toEqual('overweight level 2');
    });

    it('should return a string: overweight level 3', () => {
      person.weight = 100;
      person.height = 1.54;

      const rta = person.calcIMC();

      expect(rta).toEqual('overweight level 3');
    });

    it('should return a string: not found', () => {
      person.weight = -85;
      person.height = 1.54;

      const rta = person.calcIMC();

      expect(rta).toEqual('not found');
    });
  });
});
