import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  users: UserModel[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(){
    
    this.userService.getUser()
        .subscribe( resp => this.users);


  }

}
