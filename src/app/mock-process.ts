import { Process } from './Process';

export const PROCESSES: Process[] = [
    { id: 'proc_0', arrival_t: 0, execute_t: 5, service_t: 0, priority: 1, quantum: 3 },
    { id: 'proc_1', arrival_t: 1, execute_t: 3, service_t: 5, priority: 2, quantum: 3 },
    { id: 'proc_2', arrival_t: 2, execute_t: 8, service_t: 8, priority: 1, quantum: 3 },
    { id: 'proc_3', arrival_t: 3, execute_t: 6, service_t: 16, priority: 3, quantum: 3 },
];
