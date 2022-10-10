import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  cid = 0;
  category: any;
  categories: any;

  constructor(private active: ActivatedRoute,
    private catserv: CategoryService,
    private router: Router) { }

  updateForm() {
    this.catserv.updateCategory(this.category).subscribe(
      (res: any) => {
        this.category = res;
        Swal.fire("Successful", "Updated Category Data", "success").then((redirect) => {
          this.router.navigate(['/admin/categories']);
        });
        console.log(this.category);
      },
      (error) => {
        Swal.fire("Error !!", "Enable to Updated Category Data", "error");
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
    this.cid = this.active.snapshot.params['cid'];
    // alert(this.qId);
    this.catserv.SingleCategory(this.cid).subscribe(
      (res: any) => {
        this.category = res;
        console.log(this.category);
      },
      (error) => {
        console.log(error);
      }
    );
    this.catserv.categories().subscribe(
      (res: any) => {
        this.categories = res;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire("Error !!", "Error in loading Data", "error");
      }
    );
  }


}
