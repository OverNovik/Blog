import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { FirebaseCreateResponse, Post } from "./interfaces";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class PostService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    // check type
    return this.http.post<any>(`${environment.firebaseDbUrl}/posts.json`, post)
      .pipe(map((response: FirebaseCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        }
      }))
  }
}
