import { Person } from './person.model';

fdescribe('Test for Person', () => {
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
  });
});
