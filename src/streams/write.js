import { createWriteStream } from 'fs';

const write = async () => {
  const filePath = './files/fileToWrite.txt';

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
