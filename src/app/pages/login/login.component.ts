import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: '',
  };

  constructor(private service: LoginService, private router: Router) { }

  formlogin() {
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      alert('please enter valid username');
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      alert('please enter valid password');
      return;
    }

    //request to server to generate token

    this.service.generateToken(this.loginData).subscribe(
      (response: any) => {
        console.log("success");
        console.log(response);

        //login...
        this.service.loginUser(response.token);
        this.service.getCurrentUser().subscribe(
          (user: any) => {
            this.service.setUser(user);
            console.log(user);
            //redirect ...ADMIN: admin-dashboard
            //redirect ...NoRMAL:normal dashborad
            if (this.service.getUserRole() == "ADMIN") {
              //admin dashboard
              // window.location.href = '/admin';
              this.router.navigate(['admin']);
              this.service.loginStatusSubject.next(true);
            } else if (this.service.getUserRole() == "NORMAL") {
              //normal user dashboard
              // window.location.href = '/user';
              this.router.navigate(['user/0']);
              this.service.loginStatusSubject.next(true);
            } else {
              this.service.logout();
              location.reload();
            }
          }
        );
      },
      (error) => {
        console.log("error !");
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
  }

}
