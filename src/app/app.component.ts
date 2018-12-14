import { Component } from '@angular/core';
import { Process } from './Process';
import { Resource } from './Resource';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // global variables
  interval;
  process_exec: Process[] = [];
  process_finish: Process[] = [];
  process_waiting: Process[] = [];
  process: Process[] = [];
  resources: Resource[] = [];
  time: number = 0;
  r_time: number = 0;
  progress: number = 0;
  current_p: string = 'n/a';
  // default methods
  addProcess(name: string, execute_t: number = 10, priority: number = 1){
    const selectedResource = this.selectRandomResources();
    if (this.process_exec.length){
      var next = this.process_exec.length;
      this.process_exec.push({id: name,execute_t: execute_t,arrival_t: next,priority:priority, resource: selectedResource})
    }else {
      this.process_exec.push({id: name,execute_t: execute_t,arrival_t: 0,priority:priority, resource: selectedResource});
    }
    return false;
  }
  switch_data():void {
    if (this.process_exec.length){
      this.process_finish.push(this.process_exec[0]);
      this.process_exec.shift();
    }
  }
  algorithm(value): void {
    if (this.process_exec.length){
      switch (value) {
        case 'sjn':
          this.process_exec.sort(function(a,b) { return a.execute_t - b.execute_t});
          break;
        case 'pbs':
          this.process_exec.sort(
          function(a,b) { 
            if (a.priority == b.priority){
              return a.arrival_t - b.arrival_t
            }
            return b.priority > a.priority ? 1 : -1;
          });
          break;
        default:
          this.process_exec.sort(function(a,b) { return a.arrival_t - b.arrival_t});
          break;
      }
    }
  }
  startTimer(processor: number,threads: number, speed: number) {
      this.interval = setInterval(() => {
        if (this.process_exec.length){
          this.time += 1;
          this.r_time += processor*threads;
          this.current_p = this.process_exec[0].id;
          this.progress = Math.round((this.r_time/this.process_exec[0].execute_t)*100);
          this.progress = this.progress > 100 ? 100 : this.progress;
          if (this.r_time >= this.process_exec[0].execute_t) {
            this.r_time = 0;
            this.switch_data();
          }
        }else {
          this.stopTimer();
        }
      },1000/speed)
  }
  stopTimer() {
    clearInterval(this.interval);
  }
  parseTime(time: number){
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }
  addResource() : Resource {
    const name = "resource_" + this.resources.length.toString();    
    const expropriative = Math.floor(Math.random() * 2) + 1 == 1
    const maxUsages = expropriative ? 1 : Math.floor(Math.random() * 3) + 1;

    const newResource = { name: name, expropriative: expropriative, maxUsages: maxUsages };
    this.resources.push(newResource);

    return newResource;
  }
  private selectRandomResources(): string {
    if (this.resources.length == 0) {
      return "";
    }

    return this.resources[Math.floor(Math.random() * this.resources.length - 1)].name;
  }
}
