import { Component } from '@angular/core';
import { Process } from './Process';
import { Resource } from './Resource';
import { Frame } from './Frame';

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
  pagingAlgorithm: string = 'FCFS';
  frames: Frame[] = [
    { id: 'frame_0', resource: '' },
    { id: 'frame_1', resource: '' },
    { id: 'frame_2', resource: '' },
  ];
  // default methods
  addProcess(resource: string){
    const name = "process_" + this.process_exec.length.toString();
    const execute_t = Math.floor(Math.random() * 10) + 1;
    const priority = Math.floor(Math.random() * 10) + 1;
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
          if (this.current_p == null || this.current_p != this.process_exec[0].id) {
            this.updatePaging();
          }
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
  updatePaging() {
    const nextResource = this.process_exec[0].resource;
    if (this.frames.find((frame) => frame.resource == nextResource)) {
      return;
    }

    if (this.pagingAlgorithm == "FCFS") {
      const frame = this.frames.pop();
      frame.resource = nextResource;
      this.frames.unshift(frame);
      return;
    }

    if (this.pagingAlgorithm == "OPT") {
      const markedResources: string[] = [];
      for (let process of this.process_exec) {
        if (markedResources.indexOf(process.resource) > 0) {
          markedResources.push(process.resource);
        } 
      }

      if (markedResources.length > 0) {
        const farthestResource = markedResources[markedResources.length - 1];
        const frame = this.frames.find((frame) => frame.resource == farthestResource);
        if (frame) {
          frame.resource = nextResource;
        }
      }
    }
  }
  private findNextUpdatableFrame() {
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
  setPagingAlgorithm(algorithm: string) {
    this.pagingAlgorithm = algorithm;
  }
  private selectRandomResources(): string {
    if (this.resources.length == 0) {
      return "";
    }

    return this.resources[Math.floor(Math.random() * (this.resources.length - 1))].name;
  }
}
