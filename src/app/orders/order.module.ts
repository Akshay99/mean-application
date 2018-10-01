import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { OrderComponent } from './order.component';
import { AuthGuard } from '../user/auth-guard.service';
import { AuthService } from '../user/auth.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'order', canActivate: [ AuthGuard], component: OrderComponent }
    ])
  ],
  declarations: [
    OrderComponent
  ],
  providers: [
    DatePipe,
    AuthService,
    AuthGuard,
  ]
})
export class OrderModule {}
