import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//modules extra
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//interceptors
import { TokenInterceptor } from './interceptors/token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { PersonComponent } from './components/person/person.component';
import { PeopleComponent } from './components/people/people.component';
import { OthersComponent } from './components/others/others.component';
import { HighligthDirective } from './directives/highligth.directive';
import { ReversePipe } from './pipes/reverse.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PicoPreviewComponent,
    PersonComponent,
    PeopleComponent,
    OthersComponent,
    HighligthDirective,
    ReversePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    //activar NgModel
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
