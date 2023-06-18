import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { promises } from 'stream';

const decompress = async () => {
  const compressedFile = './files/archive.gz';
  const decompressedFile = './files/fileToCompress.txt';

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
