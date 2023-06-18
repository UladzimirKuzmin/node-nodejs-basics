import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { promises } from 'stream';

const compress = async () => {
  const fileToCompress = './files/fileToCompress.txt';
  const compressedFile = './files/archive.gz';

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
