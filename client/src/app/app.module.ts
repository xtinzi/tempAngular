import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { TodolistComponent } from "./todolist/todolist.component";
import { HttpErrorHandler } from "./http-error-handler.service";
import { MessageService } from "./message.service";

@NgModule({
  declarations: [AppComponent, TodolistComponent],
  imports: [BrowserModule, HttpModule, FormsModule, HttpClientModule],
  providers: [MessageService, HttpErrorHandler],
  bootstrap: [AppComponent]
})
export class AppModule {}
