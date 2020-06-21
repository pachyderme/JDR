/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CanvasAdvancedBrushMenuComponent } from './canvas-advanced-brush-menu.component';

describe('CanvasAdvancedBrushMenuComponent', () => {
  let component: CanvasAdvancedBrushMenuComponent;
  let fixture: ComponentFixture<CanvasAdvancedBrushMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasAdvancedBrushMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasAdvancedBrushMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
