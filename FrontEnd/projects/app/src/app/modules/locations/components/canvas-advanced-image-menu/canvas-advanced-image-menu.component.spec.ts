/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CanvasAdvancedImageMenuComponent } from './canvas-advanced-image-menu.component';

describe('CanvasAdvancedImageMenuComponent', () => {
  let component: CanvasAdvancedImageMenuComponent;
  let fixture: ComponentFixture<CanvasAdvancedImageMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasAdvancedImageMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasAdvancedImageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
