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
import {DbService} from './services/db.service';
import {TokenService} from './services/token.service';

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
  providers: [DbService, TokenService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
