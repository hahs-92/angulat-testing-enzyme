import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function query<T>(fixture: ComponentFixture<T>, selector: string) {
  const debugElement = fixture.debugElement.query(By.css(selector));
  if (!debugElement) {
    throw new Error(`query: Element ${selector} not Found`);
  }
  return debugElement;
}

//para buscar por testId
export function queryById<T>(fixture: ComponentFixture<T>, testId: string) {
  const selector = `[data-testid="${testId}"]`;
  return query(fixture, selector);
}

export function queryAll<T>(fixture: ComponentFixture<T>, selector: string) {
  return fixture.debugElement.queryAll(By.css(selector));
}

export function queryAllByDirective<T, D>(
  fixture: ComponentFixture<T>,
  directive: Type<D>
) {
  return fixture.debugElement.queryAll(By.directive(directive));
}

export function getText<T>(fixture: ComponentFixture<T>, testId: string) {
  const debugElement: DebugElement = queryById(fixture, testId);
  const element: HTMLElement = debugElement.nativeElement;

  return element.textContent;
}
