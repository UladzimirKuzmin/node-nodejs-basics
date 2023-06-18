import { promises as fsPromises } from 'fs';

const create = async () => {
  const filePath = './files/fresh.txt';

  try {
    await fsPromises.access(filePath);
    throw new Error('FS operation failed: File already exists');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fsPromises.writeFile(filePath, 'I am fresh and young');
      console.log('File created successfully!');
    } else {
      throw error;
    }
  }
};

await create();
