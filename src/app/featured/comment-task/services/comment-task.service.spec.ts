import { TestBed } from '@angular/core/testing';

import { CommentTaskService } from './comment-task.service';

describe('CommentTaskService', () => {
  let service: CommentTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
