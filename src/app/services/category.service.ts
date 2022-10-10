import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './hepler';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  //load all the category
  public categories() {
    return this.http.get(`${baseUrl}/category/`);
  }

  //add new category
  public addCategory(category: any) {
    return this.http.post(`${baseUrl}/category/`, category);
  }

  //update category
  public updateCategory(category: any) {
    return this.http.put(`${baseUrl}/category/`, category);
  }

  //delete category
  public deleteCategory(cid: any) {
    return this.http.delete(`${baseUrl}/category/${cid}`);
  }

  //get single categoryId
  public SingleCategory(cid: any) {
    return this.http.get(`${baseUrl}/category/${cid}`);
  }
}
