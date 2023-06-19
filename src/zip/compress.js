import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { promises } from 'stream';
import { fileURLToPath } from 'url';
import path from 'path';

const compress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fileToCompress = path.join(__dirname, 'files', 'fileToCompress.txt');
  const compressedFile = path.join(__dirname, 'files', 'archive.gz');

  try {
    const readStream = createReadStream(fileToCompress);
    const gzipStream = createGzip();
    const writeStream = createWriteStream(compressedFile);

    await promises.pipeline(readStream, gzipStream, writeStream);

    console.log(`File ${fileToCompress} compressed to ${compressedFile}`);
  } catch (err) {
    console.error('FS operation failed: Unable to compress file:', err);
  }
};

await compress();
