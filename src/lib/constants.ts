import { TodoData } from './types';

export const swimLanes: string[] = ['To Do', 'In Progress', 'Done'];
export const swimLaneValues: TodoData['status'][] = [
  'todo',
  'in_progress',
  'done',
];
export const BREAK_POINT_WIDTH = 768;
export const RESET_DELAY = 500;
export const RESIZE_DEBOUNCE_TIME = 500;
