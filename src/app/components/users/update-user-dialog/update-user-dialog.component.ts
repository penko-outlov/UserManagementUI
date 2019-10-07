import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css']
})
export class UpdateUserDialogComponent implements OnInit {

  @Input() user: User;

  @Output('update') onUpdate: EventEmitter<any>;

  updateUserForm: FormGroup;

  constructor(
      private modalService: NgbModal,
      private userService: UserService,
      private formBuilder: FormBuilder) {
    this.onUpdate = new EventEmitter<any>();
  }

  ngOnInit() {
    this.initializeUpdateUserFormGroup();
  }

  updateUser() {
    let updatedUser: User = {
      id: null,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      dateOfBirth: this.dateOfBirth.value,
    };
    this.userService.updateUser(updatedUser)
      .toPromise()
      .then(() => {
        this.onUpdate.emit(null);
      })
      .catch(error => {
        console.error(error);
      });
  }

  update(content) {
    this.modalService.open(content).result.then((result) => {
      if (result === 'update') {
        this.updateUser();
      }
    });
  }

  private initializeUpdateUserFormGroup() {
    this.updateUserForm = this.formBuilder.group({
      'firstName': new FormControl(this.user.firstName, [
        Validators.required
      ]),
      'lastName': new FormControl(this.user.lastName, [
        Validators.required
      ]),
      'email': new FormControl(this.user.email, [
        Validators.required,
        Validators.email
      ]),
      'dateOfBirth': new FormControl(this.user.dateOfBirth, [
        Validators.required,
        Validators.pattern(/\d{4}\-\d{1,2}\-\d{1,2}/)
      ])
    });
  }

  get firstName() { return this.updateUserForm.get('firstName'); }

  get lastName() { return this.updateUserForm.get('lastName'); }

  get email() { return this.updateUserForm.get('email'); }

  get dateOfBirth() { return this.updateUserForm.get('dateOfBirth'); }

}
