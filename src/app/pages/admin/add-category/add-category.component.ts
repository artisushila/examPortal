import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  addCategory = {
    title: '',
    description: ''
  };

  constructor(private service: CategoryService) { }

  ngOnInit(): void { }

  formSubmit() {
    if (this.addCategory.title.trim() == '' || this.addCategory.title == null) {
      Swal.fire("Error !!", "Title is reuired", "error");
      return;
    }


    this.service.addCategory(this.addCategory).subscribe(
      (res: any) => {
        this.addCategory.title = '';
        this.addCategory.description = '';
        Swal.fire("Success", "New Category is added successfully", "success");
        console.log(res);
      },
      (error) => {
        Swal.fire("Error !!", "Bad request Internal Server erorr", "error");
        console.log(error);
      }
    )

  };

}
