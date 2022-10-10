import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TestYouSelf';
  msg: any;
  onBlurEvent(event: any) {
    this.msg = event.target.value + "";
    console.log(this.msg);

  }


}
