import { promises as fsPromises } from 'fs';

const read = async () => {
  const fileToRead = './files/fileToRead.txt';

  try {
    await fsPromises.access(fileToRead);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed: File does not exist');
    } else {
      throw error;
    }
  }

  const content = await fsPromises.readFile(fileToRead, 'utf8');
  console.log(content);
};

await read();
