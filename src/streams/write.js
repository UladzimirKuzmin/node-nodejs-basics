import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

  try {
    const stream = createWriteStream(filePath, { encoding: 'utf8' });

    // Pipe the input from process.stdin to the file stream
    process.stdin.pipe(stream);

    await new Promise((resolve, reject) => {
      // Listen for the 'finish' event to indicate the writing is complete. Use CTRL+D to finish input
      stream.on('finish', resolve);

      // Listen for the 'error' event to handle any errors
      stream.on('error', reject);
    });

    console.log('Data written to file.');
  } catch (err) {
    console.error('FS operation failed: Unable to write to file:', err.message);
  }
};

await write();
