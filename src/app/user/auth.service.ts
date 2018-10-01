import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


import {IUser} from './user';

@Injectable()
export class AuthService {

  public currentUser: IUser;

  constructor(private http: Http) {
  }

  isLoggedIn(): boolean {
    try {
      const theUser: any = JSON.parse(localStorage.getItem('currentUser'));
      if (theUser) {
        this.currentUser = theUser.user;
      }
    } catch (e) {
      return false;
    }

    return !!this.currentUser;
  }

  login(oUser) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    this.http.get('/sandbox').subscribe(
      data => {
        console.log("data from API sandbox", data.json());
      },
      error => {
        console.log("Error of Sandbox ", error);
      }
    );

    //CHANGE IN DEVELOPMENT MODE TO LOCALHOST!!!!
    // return this.http.post('http://localhost:1978/api/login', JSON.stringify(oUser), options)
    return this.http.post('/api/login', JSON.stringify(oUser), options)
      .do((response: Response) => {
        if (response.json().success) {
          this.currentUser = <IUser>response.json().message;
          let userObj: any = {};
          userObj.user = response.json().message;
          userObj.token = response.json().token;

          console.log('User ', userObj.user, ' Token ', userObj.token);
          localStorage.setItem('currentUser', JSON.stringify(userObj));
        }
        response.json();
      })
      .catch(this.handleError);
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
