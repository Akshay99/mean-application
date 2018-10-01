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
  templateUrl: './ordercreate.component.html'
})

export class OrderCreateComponent implements OnInit {
  pgTitle: string = 'Order Component';
  sandboxElement: any;

  constructor(private fb: FormBuilder,
              private http: Http,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private datePipe: DatePipe) {
  }

  createNewOrder = function () {
    this.http.get('/sandbox/create').subscribe(
      data => {
        this.listAllOrders();
        this.toastr.success("Order Created", data.json().id);
        console.log("data from API sandbox", data.json());
      },
      error => {
        this.toastr.error("Eror in creation order", error);
        console.log("Error of Sandbox ", error);
      }
    );
  };

  ngOnInit() {
  }
}
