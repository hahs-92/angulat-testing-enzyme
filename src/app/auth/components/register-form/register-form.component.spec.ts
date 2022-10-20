import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../services/user.service';
import { query, queryById, getText, setInputValue } from '../../../../testing';

fdescribe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  // tipamos el spy que necesita este components
  let userServiceSpy: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    //creamos el spy. create es el metodo a espiar
    const spy = jasmine.createSpyObj('UsersService', [
      'create',
      'isAvailableByEmail',
    ]);

    await TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      imports: [ReactiveFormsModule], //agregamos las dependencias,
      providers: [
        { provide: UsersService, useValue: spy }, //proveemos el spy
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //pruebas a la logica
  it('should the emailFiled be invalid', () => {
    //component.form.get('email')?.setValue('esto no es un correo');
    //hago uso de los getters
    component.emailField?.setValue('esto no es un correo valido');

    //expect(component.form.get('email')?.invalid).toBeTruthy();
    //uso de los getters del componente
    expect(component.emailField?.invalid).withContext('empty').toBeTruthy();

    //el context nos sirve para cuando tenemos varios expects
    component.emailField?.setValue('');
    expect(component.emailField?.invalid)
      .withContext('wrong email')
      .toBeTruthy();
  });

  it('should the passwordField be invalid', () => {
    const wrongPassword = 'wrong password';
    const rightPassword = '123456';

    component.passwordField?.setValue('');
    expect(component.passwordField?.invalid).withContext('empty').toBeTruthy();

    component.passwordField?.setValue(wrongPassword);
    expect(component.passwordField?.invalid)
      .withContext('without numbers')
      .toBeTruthy();

    component.passwordField?.setValue(rightPassword);
    expect(component.passwordField?.valid)
      .withContext('right password')
      .toBeTruthy();
  });

  it('should the form be invalid', () => {
    const userMock = {
      name: 'Alex',
      email: 'Hernandez',
      password: '',
      confirmPassword: '',
      checkTerms: false,
    };

    component.form.patchValue(userMock);

    expect(component.form.invalid).toBeTruthy;
  });

  //pruebas para la UI
  it('should the emailField be invalid from UI', () => {
    const inputDebug = query(fixture, 'input#email');
    const inputEl: HTMLInputElement = inputDebug.nativeElement;

    inputEl.value = 'esto no es un correo valido';
    //emitimos el evento de input
    inputEl.dispatchEvent(new Event('input'));
    //para que el input ya no este enfocado y pueda aparecer el mensage de error
    inputEl.dispatchEvent(new Event('blur'));
    //emitimos la deteccion de cambios
    fixture.detectChanges();

    expect(component.emailField?.invalid)
      .withContext('wrong email')
      .toBeTruthy();

    const textError = getText(fixture, 'emailField-email');
    expect(textError)
      .withContext("*It's not a email valid")
      .toContain("*It's not a email");
  });

  //igual a la prueba anterior, pero con ayuda del helper que creamos
  it('should the emailField be invalid from UI, helpers', () => {
    setInputValue(fixture, 'input#email', 'esto no es un correo valido');
    //emitimos la deteccion de cambios
    fixture.detectChanges();

    expect(component.emailField?.invalid)
      .withContext('wrong email')
      .toBeTruthy();

    const textError = getText(fixture, 'emailField-email');
    expect(textError)
      .withContext("*It's not a email valid")
      .toContain("*It's not a email");
  });
});
