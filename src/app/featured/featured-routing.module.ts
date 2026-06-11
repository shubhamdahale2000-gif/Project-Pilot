import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from '../project-list/project-list.component';
import { CommentTaskComponent } from './comment-task/comment-task.component';
import { authGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  { path:'projectList', 
    canActivate: [authGuard],
    component:ProjectListComponent,
  },
  { path:'comment', 
    component:CommentTaskComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturedRoutingModule { }
