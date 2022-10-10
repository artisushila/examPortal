import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './hepler';

@Injectable({
  providedIn: 'root'
})
export class QusetionService {

  constructor(private http: HttpClient) { }

  //get question
  public getQuestionOfQuiz(qid: any) {
    return this.http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  //get Quiz question
  public getQuestionForTest(qid: any) {
    return this.http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //add question
  public addQuiz(qusetion: any) {
    return this.http.post(`${baseUrl}/question/`, qusetion);
  }

  //delete question
  public deleteQuestion(questionId: any) {
    return this.http.delete(`${baseUrl}/question/${questionId}`);
  }

  //eval quiz
  public evalQuiz(questions: any) {
    return this.http.post(`${baseUrl}/question/eval-quiz`, questions)
  }
}
