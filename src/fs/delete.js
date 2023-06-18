import { promises as fsPromises } from 'fs';

const remove = async () => {
  const fileToRemove = './files/fileToRemove.txt';

  try {
    await fsPromises.access(fileToRemove);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed: File does not exist');
    } else {
      throw error;
    }
  }

  await fsPromises.unlink(fileToRemove);
  console.log('File deleted successfully!');
};

await remove();
