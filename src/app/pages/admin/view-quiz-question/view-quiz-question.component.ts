import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QusetionService } from 'src/app/services/qusetion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css']
})
export class ViewQuizQuestionComponent implements OnInit {

  qId: any;
  qtitle: any;
  qusetions = [
    {
      quesId: '',
      content: '',
      image: '',
      option1: 0,
      option2: 0,
      option3: 0,
      option4: 0,
      answer: '',
    }
  ]

  constructor(private activated: ActivatedRoute, private questserv: QusetionService) { }

  //deleting Question
  deleteQuestion(qid: any) {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed)
        this.questserv.deleteQuestion(qid).subscribe(
          (res) => {
            console.log(res);
            this.qusetions = this.qusetions.filter(
              (qusetions) => qusetions.quesId != qid
            );
            Swal.fire("Successful", "Deleted QuiZ Data", "success");
          },
          (error) => {
            console.log(error);
            Swal.fire('Error !!', "Error Deleteing Quiz Data !!", "error");
          }
        );
    });
  };

  ngOnInit(): void {
    this.qId = this.activated.snapshot.params['qid'];
    this.qtitle = this.activated.snapshot.params['title'];
    this.questserv.getQuestionOfQuiz(this.qId).subscribe(
      (res: any) => {
        this.qusetions = res;
        console.log(this.qusetions);
      },
      (error) => {
        Swal.fire("Error !!", "Enable to load Qusetion", "error");
        console.log(error);
      }
    );
  }

}
