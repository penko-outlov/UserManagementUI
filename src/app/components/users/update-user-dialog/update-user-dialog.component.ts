import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbDateStruct, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
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

  date: NgbDateStruct;

  constructor(
      private modalService: NgbModal,
      private calendar: NgbCalendar,
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
      dateOfBirth: this.getAsDateString(this.dateOfBirth.value),
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

  updateDate(event) {
    this.date = event;
  }

  isInPast(): boolean {
    if (!this.date) {
      return true;
    }
    let currentDate: NgbDate = this.calendar.getToday();
    return currentDate.after(this.date) || currentDate.equals(this.date);
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
      'dateOfBirth': new FormControl(this.getStringAsDate(this.user.dateOfBirth), [
        Validators.required
      ])
    });
  }

  private getAsDateString(date: NgbDate): string {
    const month = date.month < 10 ? `0${date.month}` : date.month;
    const day = date.day < 10 ? `0${date.day}` : date.day;
    return `${date.year}-${month}-${day}`;
  }

  private getStringAsDate(date: string): NgbDate {
    const dateArray = date.split('-');
    const year = parseInt(dateArray[0]);
    const month = parseInt(dateArray[1]);
    const day = parseInt(dateArray[2]);
    return new NgbDate(year, month, day);
  }

  get firstName() { return this.updateUserForm.get('firstName'); }

  get lastName() { return this.updateUserForm.get('lastName'); }

  get email() { return this.updateUserForm.get('email'); }

  get dateOfBirth() { return this.updateUserForm.get('dateOfBirth'); }

}
