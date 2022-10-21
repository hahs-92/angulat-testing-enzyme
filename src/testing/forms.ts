import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { query, queryById } from './finders';

//para ayudarnos a llenar campos en un input
export function setInputValue<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  value: string,
  withTestid: boolean = false
) {
  let debugElement: DebugElement;
  if (withTestid) {
    debugElement = queryById(fixture, selector);
  } else {
    debugElement = query(fixture, selector);
  }

  const inputElement: HTMLInputElement = debugElement.nativeElement;
  inputElement.value = value;
  inputElement.dispatchEvent(new Event('input'));
  inputElement.dispatchEvent(new Event('blur'));
}

//llenar un checkbox
export function setCheckboxValue<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  value: boolean,
  withTestid: boolean = false
) {
  let debugElement: DebugElement;
  if (withTestid) {
    debugElement = queryById(fixture, selector);
  } else {
    debugElement = query(fixture, selector);
  }

  const inputElement: HTMLInputElement = debugElement.nativeElement;
  inputElement.checked = value;
  inputElement.dispatchEvent(new Event('change'));
  inputElement.dispatchEvent(new Event('blur'));
}
