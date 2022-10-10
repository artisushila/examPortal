import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  category: any;

  constructor(private cateserv: CategoryService) { }

  ngOnInit(): void {
    this.cateserv.categories().subscribe(
      (res: any) => {
        this.category = res;
        console.log(res);
      },
      (error) => {
        Swal.fire("Error !!", "Enable to load Data", "error");
        console.log(error);
      }
    )
  }

}
