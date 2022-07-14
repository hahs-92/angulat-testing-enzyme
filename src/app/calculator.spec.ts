import { Calculator } from './calculator';

describe('Tets for calculator', () => {
  fit('#multiply should return 9 ', () => {
    //arrange
    const calculator = new Calculator();
    //act
    const rta = calculator.multiply(3, 3);
    //assert
    expect(rta).toEqual(9);
  });
});
