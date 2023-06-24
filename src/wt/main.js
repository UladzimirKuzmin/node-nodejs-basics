import os from 'node:os';
import { Worker } from 'node:worker_threads';
import { fileURLToPath } from 'url';
import path from 'path';

const performCalculations = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'worker.js');

  const cpuCores = os.cpus();
  const threads = cpuCores.map(
    (_, i) =>
      new Promise((resolve, reject) => {
        const worker = new Worker(filePath, { workerData: i + 10 });
        worker.on('message', resolve);
        worker.on('error', () => reject({ status: 'error', data: null }));
      })
  );

  const result = await Promise.allSettled(threads);

  console.log(result);
};

await performCalculations();
