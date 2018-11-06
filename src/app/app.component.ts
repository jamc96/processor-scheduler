import { Component } from '@angular/core';
import { Process } from './Process';
import { PROCESSES } from './mock-process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  process_exec = PROCESSES;
  process_finish: Process[] = [];
  addProcess(process){
    console.log(process);
    return false;
  }
  fcfs():void {
    if (this.process_exec.length){
      this.process_finish.push(this.process_exec[0]);
      this.process_exec.shift();
    }
  }
  sjn():void {
    if (this.process_exec.length){
      this.process_exec.sort(function(a,b) { return a.execute_t - b.execute_t});
      this.process_finish.push(this.process_exec[0]);
      this.process_exec.shift();
    }
  }
  pbs():void {
    if (this.process_exec.length){
      this.process_exec.sort(
        function(a,b) { 
          if (a.priority == b.priority){
            return a.arrival_t - b.arrival_t
          }
          return b.priority > a.priority ? 1 : -1;
        });
    }
    this.process_finish.push(this.process_exec[0]);
    this.process_exec.shift();
  }
  rrs(): void {
    if (this.process_exec.length) {
    }
  }
}
