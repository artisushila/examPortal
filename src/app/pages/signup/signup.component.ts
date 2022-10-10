import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  constructor(private service: UserService) { }

  formsubmit() {
    console.log(this.user);
    if (this.user.username === '' || this.user.username === null) {
      Swal.fire("Error !!", "UserName is Required", "error");
      return;
    }

    //addUser: userservice
    this.service.adduser(this.user).subscribe(
      (response: any) => {
        console.log(response);
        Swal.fire('Successfully done', 'User Id is' + response.id, 'success');
      },
      (error: any) => {
        console.log(error);
        alert('something went wrong !!!');
      }
    )
  }

  ngOnInit(): void {
  }

}
