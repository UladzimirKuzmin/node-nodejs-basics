import { spawn } from 'child_process';

const spawnChildProcess = async (args) => {
  const child = spawn('node', ['./files/script.js', ...args]);

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
