import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {TaskListComponent} from './task-list/task-list.component';
import {TokenListComponent} from './token-list/token-list.component';
import {TaskComponent} from './task/task.component';
import {AppRoutingModule} from './app-routing.module';

import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {FileUploadModule} from 'primeng/fileupload';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TokenListComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    ButtonModule,
    FileUploadModule,
    // GrowlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
