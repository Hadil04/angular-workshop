import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { ListSuggestionComponent } from './core/list-suggestion/list-suggestion.component';
import { HomeComponent } from './core/home/home.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListSuggestionComponent,
    HomeComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule ,
    RouterModule ,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
