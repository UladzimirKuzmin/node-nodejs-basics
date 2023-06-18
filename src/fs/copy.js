import { promises as fsPromises } from 'fs';
import path from 'path';

const copy = async () => {
  const sourceFolder = './files';
  const destinationFolder = './files_copy';

  try {
    const sourceStats = await fsPromises.stat(sourceFolder);
    if (!sourceStats.isDirectory()) {
      throw new Error('FS operation failed: Source folder is not a directory');
    }

    await fsPromises.access(destinationFolder);
    throw new Error('FS operation failed: Destination folder already exists');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fsPromises.mkdir(destinationFolder);

      const fileNames = await fsPromises.readdir(sourceFolder);

      for (const fileName of fileNames) {
        const sourcePath = path.join(sourceFolder, fileName);
        const destinationPath = path.join(destinationFolder, fileName);
        await fsPromises.copyFile(sourcePath, destinationPath);
      }

      console.log('Folder copied successfully!');
    } else {
      throw error;
    }
  }
};

await copy();
