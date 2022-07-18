import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersComponent } from './others.component';
//pipe
import { ReversePipe } from '../../pipes/reverse.pipe';

describe('OthersComponent', () => {
  let component: OthersComponent;
  let fixture: ComponentFixture<OthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OthersComponent, ReversePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(OthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
