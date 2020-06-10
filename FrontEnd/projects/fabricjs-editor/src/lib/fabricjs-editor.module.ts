import { NgModule } from '@angular/core';
import { FabricjsEditorComponent } from './fabricjs-editor.component';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [FabricjsEditorComponent],
  imports: [FormsModule, ColorPickerModule],
  exports: [FabricjsEditorComponent],
})
export class FabricjsEditorModule {}
