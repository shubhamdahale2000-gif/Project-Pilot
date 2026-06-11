import { Component, OnInit } from '@angular/core';
import { CommentTaskService } from './services/comment-task.service';
import { Comments, CommentsResponse } from './modal/comment-task/comment-task.modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-task',
  imports: [FormsModule, CommonModule],
  templateUrl: './comment-task.component.html',
  styleUrl: './comment-task.component.css',
})
export class CommentTaskComponent implements OnInit {

  comments: Comments[] = [];
  editingComment: any = null;

  constructor(private commentService: CommentTaskService) { }

  ngOnInit() {
    this.commentService.getComments().subscribe({
      next: (res: CommentsResponse) => {
        this.comments = res.comments.map((comment: any) => ({
          ...comment,
          isEditing: false,
          originalBody: comment.body
        }));
        console.log(this.comments);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  editComment(comment: any): void {
    if (
      this.editingComment &&
      this.editingComment.id !== comment.id
    ) {

      this.editingComment.body =
        this.editingComment.originalBody;

      this.editingComment.isEditing = false;
    }

    comment.isEditing = true;

    this.editingComment = comment;
  }

  saveComment(comment: any): void {

    comment.originalBody = comment.body;
    comment.isEditing = false;

    this.editingComment = null;
  }

  cancelComment(comment: any): void {

    comment.body = comment.originalBody;

    comment.isEditing = false;

    this.editingComment = null;
  }
}
