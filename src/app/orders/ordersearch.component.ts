import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ToastrService} from '../common/toastr.service'
import {AuthService} from '../user/auth.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Component({
  templateUrl: './ordersearch.component.html'
})

export class OrderSearchComponent implements OnInit {
  orderForm: FormGroup;

  constructor(private fb: FormBuilder,
              private http: Http,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private datePipe: DatePipe) {
  }

  orderId = new FormControl('', [Validators.required]);
  feedback = new FormControl('', []);
  orderDetail: string;

  searchOrder(formdata: any): void {
    this.http.get('/sandbox/order/' + this.orderForm.value.orderId).subscribe(
      data => {
        this.orderDetail = data.json();
      },
      error => {
        console.log("Error of Sandbox ", error);
      }
    );
  }

  sendFeedback(): void {
    this.orderForm.value.feedback;
  }

  ngOnInit() {

    this.orderForm = this.fb.group({
      orderId: this.orderId,
      feedback: this.feedback
    });
  }

}
