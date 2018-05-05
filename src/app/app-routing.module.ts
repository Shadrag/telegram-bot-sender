import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TaskComponent} from './task/task.component';
import {TaskListComponent} from './task-list/task-list.component';
import {TokenListComponent} from './token-list/token-list.component';


const routes: Routes = [
  {path: '', redirectTo: '/task-list', pathMatch: 'full'},
  {path: 'task/:id', component: TaskComponent},
  {path: 'task-list', component: TaskListComponent},
  {path: 'token-list', component: TokenListComponent},
  {path: '**', redirectTo: '/task-list' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})

export class AppRoutingModule {
}