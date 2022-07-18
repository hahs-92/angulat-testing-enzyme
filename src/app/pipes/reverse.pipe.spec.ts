import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
//ngMOdel
import { FormsModule } from '@angular/forms';
//pipe
import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transfrom "roma" to "amor"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform('roma');
    expect(rta).toEqual('amor');
  });

  it('should transfrom "123" to "amor"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform('123');
    expect(rta).toEqual('321');
  });
});

// ----------------------------

@Component({
  template: `
    <h5>{{ 'roma' | reverse }}</h5>
    <input [(ngModel)]="text" type="text" />
    <p>{{ text | reverse }}</p>
  `,
})
class HostComponent {
  text = '';
}

describe('Reverse pipe with Host Componete', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HostComponent,
        //necesita a el compoente hijo a renderizar
        ReversePipe,
      ],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the h5 be "amor"', () => {
    const h5Debug = fixture.debugElement.query(By.css('h5'));
    expect(h5Debug.nativeElement.textContent).toEqual('amor');
  });

  it('should apply reverse pipe when typing in the input', () => {
    const inputDebug = fixture.debugElement.query(By.css('input'));
    const inputElement: HTMLInputElement = inputDebug.nativeElement;
    const pDebug = fixture.debugElement.query(By.css('p'));

    expect(pDebug.nativeElement.textContent).toEqual('');

    inputElement.value = 'test';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(pDebug.nativeElement.textContent).toEqual('tset');
  });
});
