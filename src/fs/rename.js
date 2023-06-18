import { promises as fsPromises } from 'fs';

const rename = async () => {
  const sourceFile = './files/wrongFilename.txt';
  const destinationFile = './files/properFilename.md';

  try {
    await fsPromises.access(sourceFile);
    await fsPromises.access(destinationFile);
    throw new Error('FS operation failed: Destination file already exists');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fsPromises.rename(sourceFile, destinationFile);
      console.log('File renamed successfully!');
    } else {
      throw error;
    }
  }
};

await rename();
