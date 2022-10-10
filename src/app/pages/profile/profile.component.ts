import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    phone: '',
    enabled: '',
    authorities: [{
      authority: ''
    }]
  };

  constructor(private service: LoginService) { }

  ngOnInit(): void {
    this.user = this.service.getUser();
    console.log(this.user);
  }

}
