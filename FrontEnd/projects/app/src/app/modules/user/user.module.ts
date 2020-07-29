import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {
  SDropdownModule,
  SAvatarModule,
  SMenuModule,
  SDividerModule,
} from '@ngx-spectre/common';

@NgModule({
  imports: [
    CommonModule,
    SDropdownModule,
    SAvatarModule,
    SMenuModule,
    SDividerModule,
    RouterModule,
  ],
  declarations: [UserProfileComponent],
  exports: [UserProfileComponent],
  providers: [],
})
export class UserModule {}
