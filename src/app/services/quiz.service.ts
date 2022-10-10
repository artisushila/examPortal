import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './hepler';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  public quizzes() {
    return this.http.get(`${baseUrl}/quiz/`);
  }

  //add quiz
  public addQuiz(quiz: any) {
    return this.http.post(`${baseUrl}/quiz/`, quiz);
  }

  //delete quiz
  public deleteQuiz(qId: any) {
    return this.http.delete(`${baseUrl}/quiz/${qId}`);
  }

  //get single quiz
  public getQuiz(qId: any) {
    return this.http.get(`${baseUrl}/quiz/${qId}`);
  }

  //update quiz
  public updateQuiz(quiz: any) {
    return this.http.put(`${baseUrl}/quiz/`, quiz);
  }

  //quizzes of all category
  public getQuizOfCategory(cid: any) {
    return this.http.get(`${baseUrl}/quiz/category/${cid}`)
  }

  //get active quizzes
  public getActiveQuizzes() {
    return this.http.get(`${baseUrl}/quiz/active`);
  }

  //get active quizzes of category
  public getActiveQuizzesOfCategory(cid: any) {
    return this.http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }
}
