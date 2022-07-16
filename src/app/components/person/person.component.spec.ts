// ComponentFixture: Ambiente para poder interactuar con nuestro component.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { PersonComponent } from './person.component';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

fdescribe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  // Pequeño ambiente de pruebas para nuestros componentes que se correra de manera asincrona
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ciclo de vida angular

    // --------------------------------
    //se agregan las props(input) que recibe este componente
    component.person = new Person('Jess', 'Jhonson', 28, 54, 1.65);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ____cuando los valores son estaticos(que no son recibidos por @Input)
  /*
  it('should have <h3> with "people"', () => {
    const personDebug: DebugElement = fixture.debugElement; //agnostico a la plataforma
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));

    const h3Element: HTMLElement = h3Debug.nativeElement;

    expect(h3Element?.textContent).toEqual('People');
  });

  it('should have <p> with This is a test¡', () => {
    const personDebug: DebugElement = fixture.debugElement; //agnostico a la plataforma
    const pDebug: DebugElement = personDebug.query(By.css('p'));

    const pElement: HTMLElement = pDebug.nativeElement;
    // const personElement: HTMLElement = personDebug.nativeElement;
    // const personElement: HTMLElement = fixture.nativeElement; //como se haria normalmente

    // const p = personElement.querySelector('p');

    expect(pElement?.textContent).toEqual('This is a test¡');
  });*/

  // ----campos dinamicos
  it('should the name be "Jess"', () => {
    expect(component.person.name).toEqual('Jess');
  });

  it('should have <h3> with "Hola { person.name }"', () => {
    //arrange
    const personDebug: DebugElement = fixture.debugElement; //agnostico a la plataforma
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const text = `Hola ${component.person.name}`;
    const h3Element: HTMLElement = h3Debug.nativeElement;
    //act
    //detecte los cambios en el render
    fixture.detectChanges();
    //assert
    expect(h3Element?.textContent).toEqual(text);
  });

  it('should have <p> with This is "My altura es {person.height}"', () => {
    const personDebug: DebugElement = fixture.debugElement; //agnostico a la plataforma
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;
    const text = `Mi altura es ${component.person.height}`;
    // const personElement: HTMLElement = personDebug.nativeElement;
    // const personElement: HTMLElement = fixture.nativeElement; //como se haria normalmente
    // const p = personElement.querySelector('p');

    //act
    fixture.detectChanges(); // sin esto es text seria = 'Mi altura es '
    //arrange
    expect(pElement?.textContent).toEqual(text);
    expect(pElement?.textContent).toContain(text); // de esta manera solo evaluamos en valor de person
  });

  it('should display text with IMC when call calcIMC', () => {
    //arrange
    component.person = new Person('Alex', 'Hernandez', 28, 57, 1.66);
    const personDebug: DebugElement = fixture.debugElement;
    const btnDebug: DebugElement = personDebug.query(By.css('button.btn-imc')); //con clase
    const btnElement: HTMLElement = btnDebug.nativeElement;
    const text = 'normal';
    //act
    component.calcIMC(); //ejecutamos directamente el metodo
    fixture.detectChanges();
    //arrange
    expect(btnElement?.textContent).toContain(text);
  });

  it('should display text with IMC when do click', () => {
    //arrange
    component.person = new Person('Alex', 'Hernandez', 28, 57, 1.66);
    const personDebug: DebugElement = fixture.debugElement;
    const btnDebug: DebugElement = personDebug.query(By.css('button.btn-imc')); //con clase
    const btnElement: HTMLElement = btnDebug.nativeElement;
    const text = 'normal';
    //act
    btnDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    //arrange
    expect(btnElement?.textContent).toContain(text);
  });
});
