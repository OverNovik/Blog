import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FirebaseAuthResponse, User } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators'

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  get token(): string | null {
    const fbTokenExp = localStorage.getItem('fb-token-exp') || 'Default'
    const expDate = new Date(fbTokenExp);

    if (new Date() > expDate) {
      this.logout();
      return null;
    }

    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<FirebaseAuthResponse | null> {
    user.returnSecureToken = true;
    return this.http.post<FirebaseAuthResponse | null>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      )
  }

  logout() {
    this.setToken(null);
  }

  isAuth(): boolean {
    return !!this.token
  }

  private setToken(response: FirebaseAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
    return response
  }
}
