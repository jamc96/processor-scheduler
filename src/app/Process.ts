import { Optional } from "@angular/core";

export class Process {
    id: string;
    arrival_t: number;
    execute_t: number;
    service_t?: number;
    priority?: number;
    quantum?: number;
}