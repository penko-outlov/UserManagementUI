import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.css']
})
export class CreateUserDialogComponent {

  @Output() create: EventEmitter<any>;

  user: User;

  createUserForm: FormGroup;

  constructor(
      private modalService: NgbModal,
      private userService: UserService,
      private formBuilder: FormBuilder) {
    this.create = new EventEmitter<any>();
    this.initializeCreateUserFormGroup();
  }

  createUser() {
    this.user = {
      id: null,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      dateOfBirth: this.dateOfBirth.value
    };
    this.userService.createUser(this.user)
      .toPromise()
      .then(() => {
        this.create.emit(null);
      })
      .catch(error => {
        console.error(error);
      });
  }

  addUser(content) {
    this.modalService.open(content).result.then((result) => {
      if (result === 'create') {
        this.createUser();
      }
    });
  }

  private initializeCreateUserFormGroup() {
    this.createUserForm = this.formBuilder.group({
      'firstName': new FormControl('', [
        Validators.required
      ]),
      'lastName': new FormControl('', [
        Validators.required
      ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'dateOfBirth': new FormControl('', [
        Validators.required,
        Validators.pattern(/\d{4}\-\d{1,2}\-\d{1,2}/)
      ])
    });
  }

  get firstName() { return this.createUserForm.get('firstName'); }

  get lastName() { return this.createUserForm.get('lastName'); }

  get email() { return this.createUserForm.get('email'); }

  get dateOfBirth() { return this.createUserForm.get('dateOfBirth'); }

}
