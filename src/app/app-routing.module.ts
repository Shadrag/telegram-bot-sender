import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TaskComponent} from './task/task.component';
import {TaskListComponent} from './task-list/task-list.component';
import {TokenListComponent} from './token-list/token-list.component';
import {DbResolver} from './db.resolver';
import {LoadTokenResolver} from './load-token.resolver';


const routes: Routes = [
  {
    path: '',
    resolve: {dbResolver: DbResolver},
    children: [
      {path: '', redirectTo: '/task-list', pathMatch: 'full'},
      {
        path: 'task/:id',
        component: TaskComponent,
        resolve: {loadTokenResolver: LoadTokenResolver},
      },
      {
        path: 'task',
        component: TaskComponent,
        resolve: {loadTokenResolver: LoadTokenResolver},
      },
      {path: 'task-list', component: TaskListComponent},
      {path: 'token-list', component: TokenListComponent},
    ]
  },
  {path: '**', redirectTo: '/task-list'},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule],
  providers: [DbResolver, LoadTokenResolver]
})

export class AppRoutingModule {
}
