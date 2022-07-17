import { Component, OnInit } from '@angular/core';
//model
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  people: Person[] = [
    new Person('Jess', 'Jhonson', 28, 54, 1.54),
    new Person('Alex', 'Hernandez', 28, 57, 1.66),
  ];

  selectedPerson: Person | null = null;
  test = { name: 'alex' };

  constructor() {}

  ngOnInit(): void {}

  choose(person: Person) {
    this.selectedPerson = person;
  }
}
