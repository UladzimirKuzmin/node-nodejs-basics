import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { promises } from 'stream';
import { fileURLToPath } from 'url';
import path from 'path';

const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const compressedFile = path.join(__dirname, 'files', 'archive.gz');
  const decompressedFile = path.join(__dirname, 'files', 'fileToCompress.txt');

  try {
    const readStream = createReadStream(compressedFile);
    const gunzipStream = createGunzip();
    const writeStream = createWriteStream(decompressedFile);

    await promises.pipeline(readStream, gunzipStream, writeStream);

    console.log(`File ${compressedFile} decompressed to ${decompressedFile}`);
  } catch (err) {
    console.error('FS operation failed: Unable to decompress file:', err);
  }
};

await decompress();
