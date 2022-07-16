import { Component, OnInit } from '@angular/core';
//model
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  person: Person = new Person('Jess', 'Jhonson', 28, 54, 1.54);

  constructor() {}

  ngOnInit(): void {}
}
