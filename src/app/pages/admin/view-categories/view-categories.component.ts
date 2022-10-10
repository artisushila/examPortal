import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categoryId: any;
  ctitle: any;
  categories = [
    {
      cid: 0,
      title: '',
      description: ''
    }
  ]
  constructor(private activated: ActivatedRoute, private category: CategoryService) { }

  deleteCategory(cid: any) {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed)
        this.category.deleteCategory(cid).subscribe(
          (res:any) => {
            console.log(this.categories);
            this.categories = this.categories.filter(
              (categories) => categories.cid != cid
            );
            Swal.fire("Successful", "Deleted Category Data", "success");
          },
          (error) => {
            console.log(error);
            Swal.fire('Error !!', "Error Deleteing Category Data !!", "error");
          }
        );
    });
  };


  ngOnInit(): void {
    this.categoryId = this.activated.snapshot.params['cid'];
    this.ctitle = this.activated.snapshot.params['title'];
    this.category.categories().subscribe(
      (response: any) => {
        this.categories = response;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire("Error !!", "Error in loading data", "error");
      }
    )
  }

}
