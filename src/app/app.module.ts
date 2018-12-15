import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { TableResourceComponent } from './table-resource/table-resource.component';
import { TableFramesComponent } from './table-frames/table-frames.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ProgressbarComponent,
    TableResourceComponent,
    TableFramesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
