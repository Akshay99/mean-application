import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {OrderListComponent} from './orderlist.component';
import {OrderCreateComponent} from './ordercreate.component';
import {OrderReviewComponent} from './orderreview.component';
import {OrderSearchComponent} from './ordersearch.component';

import {OrderComponent} from './order.component';
import {AuthGuard} from '../user/auth-guard.service';
import {AuthService} from '../user/auth.service';
import {OrderService} from './order.service'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'order', canActivate: [AuthGuard], component: OrderComponent,
        children: [
          {path: 'list', component: OrderListComponent},
          {path: 'create', component: OrderCreateComponent},
          {path: 'review', component: OrderReviewComponent},
          {path: 'search', component: OrderSearchComponent}
        ]
      }
    ])
  ],
  declarations: [
    OrderComponent,
    OrderListComponent,
    OrderCreateComponent,
    OrderReviewComponent,
    OrderSearchComponent
  ],
  providers: [
    DatePipe,
    AuthService,
    AuthGuard,
    OrderService
  ]
})
export class OrderModule {
}
