import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
//components
import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';
//models
import { Person } from 'src/app/models/person.model';
import { findIndex } from 'rxjs';

fdescribe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PeopleComponent,
        //agregamos los components hijos
        PersonComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of app-person component', () => {
    //arrange
    component.people = [
      new Person('Jess', 'Jhonson', 28, 54, 1.54),
      new Person('Alex', 'Hernandez', 28, 57, 1.66),
      new Person('Jinx', 'LOL', 23, 50, 1.66),
    ];
    //act
    fixture.detectChanges();
    //una vez se actualize los cambios, obtenemos los elementos
    const debugElements = fixture.debugElement.queryAll(By.css('app-person'));
    //assert
    expect(debugElements.length).toEqual(3);
  });

  //cuando damos click se agrega a selectPerson la persons que se hizo click
  it('should raise a select event with clicked', () => {
    //arrange
    const debugElement = fixture.debugElement.query(
      By.css('app-person .btn-choose')
    );
    //act
    debugElement.triggerEventHandler('click', null);
    fixture.detectChanges();
    //assert
    expect(component.selectedPerson).toEqual(component.people[0]);
  });

  //se debe renderizar la persona seleccionada
  it('should render the selectedPerson', () => {
    //arrange
    const btnDebug = fixture.debugElement.query(
      By.css('app-person .btn-choose')
    );
    //act
    btnDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    //se coloca aqui por el flujo
    const liDebug = fixture.debugElement.query(
      By.css('.selectedPerson ul > li')
    );
    //assert
    expect(liDebug.nativeElement.textContent).toContain(
      component.selectedPerson?.name
    );
  });
});
