import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../common.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      userInfo => {this.user = userInfo;},
      error => this.userService.askForUserId('ridiculuser').subscribe(
        newUser => this.userService.setCurrentUser(newUser).subscribe(
           () => user => newUser
        )
      )
    )

  }

}
