import { Component, OnInit, Input } from '@angular/core';
import { Process } from '../Process';
import { timer } from 'rxjs';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() processes: Process[];
  constructor() { }

  ngOnInit() {
    console.log('table component working');
  }
  onDelete(process :Process):void {
    for (let i = 0; i < this.processes.length; i++) {
     if (process['id'] == this.processes[i]['id']) {
      //  this.processes.splice(i,1);
      console.log('delete function works!');
     } 
    }
  }
}
