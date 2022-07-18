//agregamos
import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
//ngMOdel
import { FormsModule } from '@angular/forms';
//directive
import { HighligthDirective } from './highligth.directive';

//host
@Component({
  template: `
    <h5 class="title" appHighligth>default</h5>
    <h5 appHighligth="blue">tomato</h5>
    <p appHighligth="tomato">parrafo con directiva</p>
    <p>parrafo sin directiva</p>
    <input [(ngModel)]="color" [appHighligth]="color" type="text" />
  `,
})
class HostComponent {
  color = 'tomato';
}

describe('HighligthDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HostComponent,
        //necesita a el compoente hijo a renderizar
        HighligthDirective,
      ],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  describe('Test for Highligth Directive', () => {
    it('should have three highligth elements', () => {
      const elements = fixture.debugElement.queryAll(
        By.directive(HighligthDirective)
      );
      // const elementsWithoutDirective = fixture.debugElement.queryAll(
      //   By.css('*:not([appHighligth])')
      // );

      expect(elements.length).toEqual(4);
      // expect(elementsWithoutDirective.length).toEqual(1);
    });

    it('should the elements match with bgColor', () => {
      const elements = fixture.debugElement.queryAll(
        By.directive(HighligthDirective)
      );

      expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
      expect(elements[1].nativeElement.style.backgroundColor).toEqual('blue');
      expect(elements[2].nativeElement.style.backgroundColor).toEqual('tomato');
    });

    it('should the h5.title be default bgColor', () => {
      const titleDebug = fixture.debugElement.query(By.css('.title'));
      const directive = titleDebug.injector.get(HighligthDirective);

      expect(titleDebug.nativeElement.style.backgroundColor).toEqual(
        directive.defaultColor
      );
    });

    it('should bind <input> and change bgColor', () => {
      const inputDebug = fixture.debugElement.query(By.css('input'));
      const inpueElement: HTMLInputElement = inputDebug.nativeElement;

      expect(inpueElement.style.backgroundColor).toEqual('tomato');

      inpueElement.value = 'green';
      //actiavmos el cambios
      inpueElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(inpueElement.style.backgroundColor).toEqual('green');
      expect(component.color).toEqual('green');
    });
  });
});
