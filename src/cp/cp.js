import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const spawnChildProcess = async (args) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'files', 'script.js');

  const child = spawn('node', [filePath, ...args]);

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  const onClose = (code) => {
    console.log(`Child process exited with code ${code}`);
  };

  const waitForChildExit = () =>
    new Promise((resolve) => {
      child.on('close', onClose);
      child.on('exit', resolve);
    });

  await waitForChildExit();
};

spawnChildProcess(['arg1', 'arg2']);
