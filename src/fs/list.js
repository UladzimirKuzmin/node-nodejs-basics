import { promises as fsPromises } from 'fs';

const list = async () => {
  const folderPath = './files';

  try {
    await fsPromises.access(folderPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed: Folder does not exist');
    } else {
      throw error;
    }
  }

  const filenames = await fsPromises.readdir(folderPath);
  console.log(filenames);
};

await list();
