import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentsResponse } from '../modal/comment-task/comment-task.modal';

@Injectable({
  providedIn: 'root',
})
export class CommentTaskService {
  
  constructor( private http: HttpClient) { }
  
  getComments(){
    return this.http.get<CommentsResponse>('https://dummyjson.com/posts/1/comments?limit=3')
  }
}
