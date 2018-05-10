import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';

import {AppComponent} from './app.component';
import {TaskListComponent} from './task-list/task-list.component';
import {TokenListComponent} from './token-list/token-list.component';
import {TaskComponent} from './task/task.component';
import {AppRoutingModule} from './app-routing.module';
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
    BrowserAnimationsModule,
    ToolbarModule,
    ButtonModule,
    FileUploadModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule
  ],
  providers: [DbService, TokenService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
