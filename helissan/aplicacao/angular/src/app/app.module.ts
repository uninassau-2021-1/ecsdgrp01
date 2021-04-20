import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { Tela0001Component } from './components/tela0001/tela0001.component';
import { Tela0002Component } from './components/tela0002/tela0002.component';
import { Tela0003Component } from './components/tela0003/tela0003.component';
import { Tela0004Component } from './components/tela0004/tela0004.component';
import { Tela0005Component } from './components/tela0005/tela0005.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Tela0001Component,
    Tela0002Component,
    Tela0003Component,
    Tela0004Component,
    Tela0005Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
