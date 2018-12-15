import { Component, OnInit, Input } from '@angular/core';
import { Frame } from '../Frame';

@Component({
  selector: 'app-table-frames',
  templateUrl: './table-frames.component.html',
  styleUrls: ['./table-frames.component.css']
})
export class TableFramesComponent implements OnInit {
  @Input() frames: Frame[];
  constructor() { }

  ngOnInit() {
  }

}
