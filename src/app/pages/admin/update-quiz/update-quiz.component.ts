import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qId = 0;
  quiz: any;
  categor: any;

  constructor(private active: ActivatedRoute,
    private quizserv: QuizService,
    private catserv: CategoryService,
    private router: Router) { }

  updateForm() {
    this.quizserv.updateQuiz(this.quiz).subscribe(
      (res: any) => {
        this.quiz = res;
        Swal.fire("Successful", "Updated Quiz Data", "success").then((redirect) => {
          this.router.navigate(['/admin/view-quiz']);
        });
        console.log(this.quiz);
      },
      (error) => {
        Swal.fire("Error !!", "Enable to Updated Quiz Data", "error");
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
    this.qId = this.active.snapshot.params['qid'];
    // alert(this.qId);
    this.quizserv.getQuiz(this.qId).subscribe(
      (res: any) => {
        this.quiz = res;
        console.log(this.quiz);
      },
      (error) => {
        console.log(error);
      }
    );
    this.catserv.categories().subscribe(
      (res: any) => {
        this.categor = res;
        console.log(this.categor);
      },
      (error) => {
        console.log(error);
        Swal.fire("Error !!", "Error in loading Data", "error");
      }
    );
  }

}
