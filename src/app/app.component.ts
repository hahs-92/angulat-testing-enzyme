import { Component } from '@angular/core';
//calculator
import { Calculator } from './calculator';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-testing';

  ngOnInit() {
    const calculator = new Calculator();

    const rta = calculator.multiply(2, 2);
    console.log(rta);

    const div = calculator.divide(12, 3);
    console.log(div);
  }
}
