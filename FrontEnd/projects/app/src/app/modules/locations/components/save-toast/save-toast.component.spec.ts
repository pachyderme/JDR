/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SaveToastComponent } from './save-toast.component';

describe('SaveToastComponent', () => {
  let component: SaveToastComponent;
  let fixture: ComponentFixture<SaveToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveToastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
