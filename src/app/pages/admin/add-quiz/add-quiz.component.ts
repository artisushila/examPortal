import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categor = [
    {
      cid: '',
      title: '',
    }
  ];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestion: '',
    active: true,
    category: {
      cid: '',
    }
  };

  constructor(private catservice: CategoryService, private quiserv: QuizService) { }

  addQuizData() {
    console.log(this.quizData);
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      Swal.fire("Error !!", "Enable to Add New Quiz", "error");
      return;
    };
    this.quiserv.addQuiz(this.quizData).subscribe(
      (res: any) => {
        this.quizData = res;
        console.log(this.quizData);
        Swal.fire("successFuly", "New Quiz Added", "success");
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestion: '',
          active: true,
          category: {
            cid: '',
          }
        };
      },
      (error: any) => {
        console.log(error);
        Swal.fire("Error !!", "Enable to Add New Quiz", "error");
      }
    );
  };

  ngOnInit(): void {
    this.catservice.categories().subscribe(
      (res: any) => {
        this.categor = res;
        console.log(this.categor);
      },
      (error: any) => {
        console.log(error);
        Swal.fire("Error !!", "Enable to load server data", "error");
      }
    )
  }

}
