import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId: any;
  getQuiz: any;
  constructor(private activate: ActivatedRoute, private quizserv: QuizService) { }

  ngOnInit(): void {
    this.activate.params.subscribe((paramas) => {
      this.catId = paramas['catId'];
      if (this.catId == 0) {
        this.quizserv.getActiveQuizzes().subscribe(
          (res: any) => {
            this.getQuiz = res;
            console.log(this.getQuiz);
          },
          (error) => {
            Swal.fire("Error !!", "Enable to lad Quiz Data", "error");
            console.log(error);
          }
        )
      } else {
        this.quizserv.getActiveQuizzesOfCategory(this.catId).subscribe(
          (res) => {
            this.getQuiz = res;
            console.log(this.getQuiz);
          },
          (error) => {
            Swal.fire("Error !!", "Enable to load Data", "error");
            console.log(error);
          }
        )
      }
    });
  }

}
