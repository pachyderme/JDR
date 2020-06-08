import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricjsEditorComponent } from './fabricjs-editor.component';

describe('FabricjsEditorComponent', () => {
  let component: FabricjsEditorComponent;
  let fixture: ComponentFixture<FabricjsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricjsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricjsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
