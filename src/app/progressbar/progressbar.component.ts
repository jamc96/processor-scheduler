import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
})
export class ProgressbarComponent implements OnInit {
  @Input() width: number = 0;
  @Input() name: string = 'n/a';
  constructor() { }

  ngOnInit() {
  }

}
