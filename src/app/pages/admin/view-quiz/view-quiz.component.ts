import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent implements OnInit {

  quizzes = [
    {
      qId: 0,
      title: '',
      description: '',
      maxMarks: '',
      numberOfQuestion: '',
      active: '',
      category: {
        title: '',
      }
    }
  ];

  constructor(private quiz: QuizService) { }

  deleteQuiz(qId: any) {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed)
        this.quiz.deleteQuiz(qId).subscribe(
          (res) => {
            console.log(res);
            this.quizzes = this.quizzes.filter(
              (quiz) => quiz.qId != qId
            );
            Swal.fire("Successful", "Deleted QuiZ Data", "success");
          },
          (error) => {
            console.log(error);
            Swal.fire('Error !!', "Error Deleteing Quiz Data !!", "error");
          }
        );
    });
  }

  ngOnInit(): void {
    this.quiz.quizzes().subscribe(
      (res: any) => {
        this.quizzes = res;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire("Error !!", 'Error in loading data', "error");
      }
    )
  }

}
