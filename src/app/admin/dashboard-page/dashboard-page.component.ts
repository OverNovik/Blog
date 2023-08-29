import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy{
  posts: Post[] = []
  postSub!: Subscription

  constructor(private postsService: PostService) {}

  ngOnInit(): void {
    this.postsService.getAll().subscribe((posts) => {
      this.posts = posts
    })
  }

  remove(id: string | undefined) {}

  ngOnDestroy(): void {
    if (this.postSub) {
      this.postSub.unsubscribe()
    }
  }
}
