import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { DeleteUserDialogComponent } from './components/users/delete-user-dialog/delete-user-dialog.component';
import { CreateUserDialogComponent } from './components/users/create-user-dialog/create-user-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserDialogComponent } from './components/users/update-user-dialog/update-user-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    DeleteUserDialogComponent,
    CreateUserDialogComponent,
    UpdateUserDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModalModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
