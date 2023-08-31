import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostService } from 'src/app/shared/post.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy{
  posts: Post[] = []
  postSub!: Subscription
  dSub!: Subscription
  searchStr = ''

  constructor(private postsService: PostService, private alert: AlertService) {}

  ngOnInit() {
    this.postsService.getAll().subscribe((posts) => {
      this.posts = posts
    })
  }

  remove(id: string | undefined) {
    this.dSub = this.postsService.remove(id as string).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id)
      this.alert.danger('Post was deleted!')
    })
  }

  ngOnDestroy(): void {
    if (this.postSub) {
      this.postSub.unsubscribe()
    }

    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }
}
