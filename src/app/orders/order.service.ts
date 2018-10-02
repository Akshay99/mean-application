import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class OrderService {

  public jwtToken: string;

  constructor(private http: Http) {
    const theUser: any = JSON.parse(localStorage.getItem('currentUser'));
    if (theUser) {
      this.jwtToken = theUser.token;
    }
  }

  submitReview(review) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', `${this.jwtToken}`);
    let options = new RequestOptions({headers: headers});
    //CHANGE IN DEVELOPMENT MODE TO LOCALHOST !!!!!
    // return this.http.post('http://localhost:1978/register', JSON.stringify(oUser), options)
    return this.http.post('/api/review', JSON.stringify(review), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getReview() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    let options = new RequestOptions({headers: headers});

    return this.http.get(`/api/review`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
