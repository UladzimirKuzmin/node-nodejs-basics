import os from 'node:os';
import { Worker } from 'node:worker_threads';

const performCalculations = async () => {
  const cpuCores = os.cpus();
  const threads = cpuCores.map(
    (_, i) =>
      new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {
          workerData: i + 10,
        });

        worker.on('message', resolve);
        worker.on('error', () => reject({ status: 'error', data: null }));
      })
  );

  const result = await Promise.all(threads);

  console.log(result);
};

await performCalculations();
