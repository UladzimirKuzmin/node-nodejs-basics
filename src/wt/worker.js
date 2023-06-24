import { parentPort, workerData } from 'node:worker_threads';

// n should be received from main thread
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  const num = Math.random();

  if (num > 0.5) {
    throw new Error('Worker failed');
  }

  parentPort.postMessage({
    status: 'resolved',
    data: nthFibonacci(workerData),
  });
};

sendResult();
