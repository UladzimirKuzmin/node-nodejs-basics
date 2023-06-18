import { createReadStream } from 'fs';

const read = async () => {
  const filePath = './files/fileToRead.txt';

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
