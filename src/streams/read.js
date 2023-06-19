import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

  try {
    const stream = createReadStream(filePath, { encoding: 'utf8' });

    for await (const chunk of stream) {
      process.stdout.write(chunk);
    }
  } catch (err) {
    console.error('FS operation failed: Unable to read the file:', err.message);
  }
};

await read();
