import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounceFn<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let id: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
