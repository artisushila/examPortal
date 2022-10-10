import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QusetionService } from 'src/app/services/qusetion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid: any;
  questions: any;
  marksGot = 0;
  correctAnswer = 0;
  attempted = 0;
  isSubmit = false;
  timer: any;

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


  constructor(private locationSt: LocationStrategy,
    private activated: ActivatedRoute,
    private Questionserv: QusetionService,
    private service: LoginService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this.activated.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestion();
    this.user = this.service.getUser();
    console.log(this.user);
  }

  loadQuestion() {
    this.Questionserv.getQuestionForTest(this.qid).subscribe(
      (res: any) => {
        this.questions = res;
        this.timer = this.questions.length * 2 * 60;
        console.log(this.questions);
        this.startTimer();
      },
      (error) => {
        Swal.fire("Error !!", "Enable to load Quiz Questions", "error");
        console.log(error);
      }
    );
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let seconds = this.timer - mm * 60;
    return `${mm} : ${seconds} sec`;
  };

  preventBackButton() {
    history.pushState(null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'question',
    }).then((callback) => {
      if (callback.isConfirmed) {
        //calculation
        this.evalQuiz();
      }
    });
  }
  evalQuiz() {
    //calucation
    //call to server to check question
    this.Questionserv.evalQuiz(this.questions).subscribe(
      (res: any) => {
        console.log(res);
        this.marksGot = parseFloat(Number(res.marksGot).toFixed(2));
        this.correctAnswer = res.correctAnswer;
        this.attempted = res.attempted;
        this.isSubmit = true;
      },
      (error) => {
        console.log(error);
      }
    )
    // this.questions.forEach((result: any) => {
    //   if (result.givenAnswer == result.answer) {
    //     this.correctAnswer++;
    //     let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
    //     this.marksGot += marksSingle;
    //   }
    //   if (result.givenAnswer.trim() != '') {
    //     this.attempted++;
    //   }
    // console.log(this.questions);
    // console.log('correct Answers :' + this.correctAnswer);
    // console.log('Marks Got :' + this.marksGot);
    // console.log('Attempted quiz times :' + this.attempted);
    // });
  }
  printPage() {
    window.print();
  }
}
