import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers()
      .toPromise()
      .then(result => {
        this.users = result;
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteUserById(userId: string, itemIndex: number) {
    this.userService.deleteUserById(userId)
      .toPromise()
      .then(() => {
        this.users.splice(itemIndex, 1);
      })
      .catch(error => {
        console.error(error);
      });
  }

}
