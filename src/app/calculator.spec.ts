import { Calculator } from './calculator';

describe('Tets for calculator', () => {
  it('#multiply 3 * 3 should return 9 ', () => {
    //arrange
    const calculator = new Calculator();
    //act
    const rta = calculator.multiply(3, 3);
    //assert
    expect(rta).toEqual(9);
  });

  it('#multiply 3 * 0 should return 0', () => {
    //arrange
    const calculator = new Calculator();
    //act
    const rta = calculator.multiply(3, 0);
    //assert
    expect(rta).toEqual(0);
  });

  it('#divide 12 / 4 should return 3', () => {
    //arrange
    const calculator = new Calculator();
    //act
    const rta = calculator.divide(12, 4);
    //assert
    expect(rta).toEqual(3);
  });

  it('#divide 12 / 0 should return null', () => {
    //arrange
    const calculator = new Calculator();
    //act
    const rta = calculator.divide(12, 0);
    //assert
    expect(rta).toBeNull();
  });
});
