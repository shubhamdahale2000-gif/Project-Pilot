import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturedRoutingModule } from './featured-routing.module';
import { ProjectListComponent } from '../project-list/project-list.component';
import { FilterPipe } from '../appPipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomDirective } from '../Directives/custom.directive';


@NgModule({
    imports: [CommonModule,
        FeaturedRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        FontAwesomeModule,
        NgxPaginationModule, ProjectListComponent,
        FilterPipe,
        CustomDirective
      ],
    providers: [FilterPipe, provideHttpClient(withInterceptorsFromDi())] })
export class FeaturedModule {
  constructor(){
    console.log("Feature Module called")
  }
 }
