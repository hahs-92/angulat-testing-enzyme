import { Injectable } from '@angular/core';
//services
import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(
    //injectamos ervicio
    private valueService: ValueService
  ) {}

  getValue() {
    return this.valueService.getValue();
  }
}
