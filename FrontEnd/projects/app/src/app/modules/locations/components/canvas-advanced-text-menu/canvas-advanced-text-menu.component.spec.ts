/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CanvasAdvancedTextMenuComponent } from './canvas-advanced-text-menu.component';

describe('CanvasAdvancedTextMenuComponent', () => {
  let component: CanvasAdvancedTextMenuComponent;
  let fixture: ComponentFixture<CanvasAdvancedTextMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasAdvancedTextMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasAdvancedTextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
