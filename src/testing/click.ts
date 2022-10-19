import { ComponentFixture } from '@angular/core/testing';
import { query, queryById } from './finders';
import { DebugElement } from '@angular/core';

//este es un click de event propios de angular
// que estan añadidos al element (click) etc
export function clickEvent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId: boolean = false,
  event: unknown = null
) {
  let element: DebugElement;

  if (withTestId) {
    element = queryById(fixture, selector);
  } else {
    element = query(fixture, selector);
  }

  element.triggerEventHandler('click', event);
}

//un click normal
export function clickElement<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId: boolean = false
) {
  let elementDebug: DebugElement;

  if (withTestId) {
    elementDebug = queryById(fixture, selector);
  } else {
    elementDebug = query(fixture, selector);
  }

  const element: HTMLElement = elementDebug.nativeElement;
  element.click();
}
