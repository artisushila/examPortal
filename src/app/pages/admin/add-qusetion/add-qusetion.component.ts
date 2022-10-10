import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QusetionService } from 'src/app/services/qusetion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-qusetion',
  templateUrl: './add-qusetion.component.html',
  styleUrls: ['./add-qusetion.component.css']
})
export class AddQusetionComponent implements OnInit {

  qId: any;
  qtitle: any;
  qusetion = {
    quiz: { qId: '', },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(private active: ActivatedRoute, private queserv: QusetionService) { }

  addQusetion() {
    if (this.qusetion.content.trim() == '' || this.qusetion.content == null) {
      Swal.fire("Error !!", "Content is required", "error");
      return;
    };
    if (this.qusetion.option1.trim() == '' || this.qusetion.option1 == null) {
      Swal.fire("Error !!", "option1 is required", "error");
      return;
    };
    if (this.qusetion.option2.trim() == '' || this.qusetion.option2 == null) {
      Swal.fire("Error !!", "option2 is required", "error");
      return;
    };
    if (this.qusetion.answer.trim() == '' || this.qusetion.answer == null) {
      Swal.fire("Error !!", "Answer is required", "error");
      return;
    };
    this.queserv.addQuiz(this.qusetion).subscribe(
      (res: any) => {
        Swal.fire("success", "Added Next New Question", "success");
        // this.qusetion = res;
        // console.log(this.qusetion);
        this.qusetion.content = '',
          this.qusetion.option1 = '',
          this.qusetion.option2 = '',
          this.qusetion.option3 = '',
          this.qusetion.option4 = '',
          this.qusetion.answer = ''
      },
      (error) => {
        Swal.fire("Error !!", "Enable to Add New Question", "error");
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
    this.qId = this.active.snapshot.params['qid'];
    this.qtitle = this.active.snapshot.params['title'];
    this.qusetion.quiz['qId'] = this.qId;
  }

}
