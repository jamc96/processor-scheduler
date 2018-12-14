import { Component, OnInit, Input } from '@angular/core';
import { Resource } from '../Resource'
@Component({
  selector: 'app-table-resource',
  templateUrl: './table-resource.component.html',
  styleUrls: ['./table-resource.component.css']
})
export class TableResourceComponent implements OnInit {
  @Input() resources: Resource[];
  constructor() { }

  ngOnInit() {
  }

}
