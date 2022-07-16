// ComponentFixture: Ambiente para poder interactuar con nuestro component.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { PersonComponent } from './person.component';
import { By } from '@angular/platform-browser';

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
  });
});
