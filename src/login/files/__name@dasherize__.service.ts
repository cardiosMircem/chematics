import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { <%= classify(name) %>ReqDto } from './<%= dasherize(name) %>.interface';

@Injectable({ providedIn: 'root' })
export class <%= classify(name) %>Service {
  baseUrl = 'localhost:3000';

  constructor(private http: HttpClient) {}

  /**
   * Makes a login request, with credential, and saves token if response is successful.
   * @param credentials User's credentials
   * @return true if all is good
   */
  login(credentials: <%= classify(name) %>ReqDto): Observable<boolean> {
    // credentials.password = btoa(credentials.password);
    return this.http.post<boolean>(`${this.baseUrl}/login`, credentials).pipe(
      switchMap((response: any) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        return of(true);
      })
    );
  }
}