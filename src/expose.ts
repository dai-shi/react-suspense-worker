import { expose as comlinkExpose } from 'comlink';

/**
 * Expose a value in worker thread to be wrapped in main thread
 *
 * @example
 * import { expose } from 'react-suspense-worker';
 *
 * const fib = (i) => (i <= 1 ? i : fib(i - 1) + fib(i - 2));
 *
 * expose(fib);
 */
export const expose = comlinkExpose;
