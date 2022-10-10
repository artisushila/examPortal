import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit {

  qid: any;
  startQuiz: any;
  constructor(private activated: ActivatedRoute,
    private quiserv: QuizService,
    private route: Router) { }

  ngOnInit(): void {
    this.qid = this.activated.snapshot.params['qid'];
    this.quiserv.getQuiz(this.qid).subscribe(
      (res: any) => {
        this.startQuiz = res;
        console.log(this.startQuiz);
      },
      (error) => {
        Swal.fire("Error", "Enable to start Quiz", "error");
        console.log(error);
      }
    )
  }

  start() {
    Swal.fire({
      title: 'Do you want to start the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon: 'question',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Swal.fire('Lets Start!', '', 'success')
        this.route.navigate(['/start/' + this.qid]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}
