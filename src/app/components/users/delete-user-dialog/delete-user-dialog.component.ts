import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent {

  @Input() user: User;

  @Output() delete: EventEmitter<any>;

  constructor(
    private modalService: NgbModal,
    private userService: UserService) {
      this.delete = new EventEmitter();
  }

  deleteUserById() {
    this.userService.deleteUserById(this.user.id)
      .toPromise()
      .then(() => {
        this.delete.emit(null);
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteUser(content) {
    this.modalService.open(content).result.then(result => {
      if (result === 'delete') {
        this.deleteUserById();
      }
    });
  }

}
