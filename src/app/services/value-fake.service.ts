import { of } from 'rxjs';

export class FakeValueService {
  constructor() {}

  getValue() {
    return 'fake value';
  }

  setValue(value: string) {}

  getPromiseValue() {
    return Promise.resolve('promise fake value');
  }

  getObservableValue() {
    return of('observable value');
  }
}
