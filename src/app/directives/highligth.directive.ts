import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighligth]',
})
export class HighligthDirective implements OnChanges {
  defaultColor = 'gray';
  @Input('appHighligth') bgColor = '';

  //recibimos el elementRef
  constructor(private element: ElementRef) {
    this.element.nativeElement.style.backgroundColor = this.defaultColor;
  }

  ngOnChanges(): void {
    this.element.nativeElement.style.backgroundColor =
      this.bgColor || this.defaultColor;
  }
}
