import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  islogin = false;
  user = {
    username: '',
  };

  constructor(public service: LoginService) { }

  public logout() {
    this.service.logout();
    window.location.reload();
  }

  ngOnInit(): void {
    this.islogin = this.service.isloggedIn();
    this.user = this.service.getUser();
    this.service.loginStatusSubject.asObservable().subscribe(
      (data: any) => {
        this.islogin = this.service.isloggedIn();
        this.user = this.service.getUser();
      }
    )
  }


}
