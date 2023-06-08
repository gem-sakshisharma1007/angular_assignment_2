import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsersComponent,
    CreateComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UsersRoutingModule,
    RouterModule.forChild([
      { path: '', component: CreateComponent },
      { path: 'create', component: CreateComponent },
      { path: 'view', component: ViewComponent },
    ])
  ]
})
export class UsersModule { }
