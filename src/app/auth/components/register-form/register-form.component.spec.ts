import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../services/user.service';
import {
  query,
  queryById,
  getText,
  setInputValue,
  mockObservable,
  asyncData,
  setCheckboxValue,
  clickEvent,
  clickElement,
  asyncError,
} from '../../../../testing';

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
    //nuestro servicio
    userServiceSpy = TestBed.inject(
      UsersService
    ) as jasmine.SpyObj<UsersService>;
    component = fixture.componentInstance;
    //mock para isVailableByEmail
    userServiceSpy.isAvailableByEmail.and.returnValue(
      mockObservable({ isAvailable: true })
    );
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

  it('should send the form successfully', () => {
    const userMock = {
      name: 'Alex',
      email: 'test@email.com',
      password: '123456',
      confirmPassword: '123456',
      checkTerms: true,
    };

    component.form.patchValue(userMock);

    //si todo sale bien el servicio nos retorna un user
    //vamos a mirar que el servicio create, si se alla ejecutado
    userServiceSpy.create.and.returnValue(
      mockObservable({ ...userMock, id: '1', role: 'customer' })
    );

    //act
    //llamamos el evento register del componente
    component.register(new Event('submit'));

    expect(component.form.valid).toBeTruthy;
    expect(userServiceSpy.create).toHaveBeenCalled();
  });

  //esta envuelta en fakeasync
  it('should send the form successfully and loading => success', fakeAsync(() => {
    const userMock = {
      name: 'Alex',
      email: 'test@email.com',
      password: '123456',
      confirmPassword: '123456',
      checkTerms: true,
    };

    component.form.patchValue(userMock);

    //si todo sale bien el servicio nos retorna un user
    //vamos a mirar que el servicio create, si se alla ejecutado
    userServiceSpy.create.and.returnValue(
      asyncData({ ...userMock, id: '1', role: 'customer' })
    );

    //act
    //llamamos el evento register del componente
    component.register(new Event('submit'));
    expect(component.status).toEqual('loading');

    //ejecuta tareas pendientes async
    tick();
    fixture.detectChanges();
    expect(component.status).toEqual('success');

    expect(component.form.valid).toBeTruthy;
    expect(userServiceSpy.create).toHaveBeenCalled();
  }));

  it('should send the form successfully UI', fakeAsync(() => {
    const userMock = {
      name: 'Alex',
      email: 'test@email.com',
      password: '123456',
      confirmPassword: '123456',
      checkTerms: true,
    };

    //llenamos los campos del form
    setInputValue(fixture, 'input#name', 'Alex');
    setInputValue(fixture, 'input#email', 'test@email.com');
    setInputValue(fixture, 'input#password', '123456');
    setInputValue(fixture, 'input#confirmPassword', '123456');
    setCheckboxValue(fixture, 'input#terms', true);

    //miramos que el formulario si se lleno correctamente
    //console.log(component.form.value);

    //si todo sale bien el servicio nos retorna un user
    //vamos a mirar que el servicio create, si se alla ejecutado
    userServiceSpy.create.and.returnValue(
      asyncData({ ...userMock, id: '1', role: 'customer' })
    );

    //act
    //llamamos el evento register del componente
    //component.register(new Event('submit'));

    //en este caso como el button no tiene un evento (click)
    //entonces lansamos el evento submit
    //query(fixture, 'form').triggerEventHandler('ngSubmit', new Event('submit'));
    //tambien podemos hacerle click al elemento nativo
    clickElement(fixture, 'btn-submit', true);

    expect(component.status).toEqual('loading');

    //ejecuta tareas pendientes async
    tick();
    fixture.detectChanges();
    expect(component.status).toEqual('success');

    expect(component.form.valid).toBeTruthy;
    expect(userServiceSpy.create).toHaveBeenCalled();
  }));

  it('should send the form UI, but with error in the server', fakeAsync(() => {
    const userMock = {
      name: 'Alex',
      email: 'test@email.com',
      password: '123456',
      confirmPassword: '123456',
      checkTerms: true,
    };

    //llenamos los campos del form
    setInputValue(fixture, 'input#name', 'Alex');
    setInputValue(fixture, 'input#email', 'test@email.com');
    setInputValue(fixture, 'input#password', '123456');
    setInputValue(fixture, 'input#confirmPassword', '123456');
    setCheckboxValue(fixture, 'input#terms', true);

    //miramos que el formulario si se lleno correctamente
    //console.log(component.form.value);

    //va arrojar un error
    userServiceSpy.create.and.returnValue(asyncError(userMock));

    //en este caso como el button no tiene un evento (click)
    //entonces lansamos el evento submit
    //query(fixture, 'form').triggerEventHandler('ngSubmit', new Event('submit'));
    //tambien podemos hacerle click al elemento nativo
    clickElement(fixture, 'btn-submit', true);

    expect(component.status).toEqual('loading');

    //ejecuta tareas pendientes async
    tick();
    fixture.detectChanges();
    expect(component.status).toEqual('error');

    expect(component.form.valid).toBeTruthy;
    expect(userServiceSpy.create).toHaveBeenCalled();
  }));

  //cuando el email ya no esta disponible
  it('should show an error with email invalid', () => {
    //arrange
    userServiceSpy.isAvailableByEmail.and.returnValue(
      mockObservable({ isAvailable: false })
    );
    setInputValue(fixture, 'input#email', 'nico@email.com');
    //act
    fixture.detectChanges();
    //assert
    expect(component.emailField?.invalid).toBeTrue();
    expect(userServiceSpy.isAvailableByEmail).toHaveBeenCalled();
    expect(userServiceSpy.isAvailableByEmail).toHaveBeenCalledWith(
      'nico@email.com'
    );
  });

  //tambien se podria validar que el mensage de error se renderize
});
