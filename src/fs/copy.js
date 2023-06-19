import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import { pathExists } from '../pathExists.js';

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const sourceFolder = path.join(__dirname, 'files');
  const destinationFolder = path.join(__dirname, 'files_copy');

  try {
    if (await pathExists(sourceFolder)) {
      const sourceStats = await fsPromises.stat(sourceFolder);
      if (!sourceStats.isDirectory()) {
        throw new Error(
          'FS operation failed: Source folder is not a directory'
        );
      }
    } else {
      throw new Error('FS operation failed: Source folder does not exist');
    }

    if (await pathExists(destinationFolder)) {
      throw new Error('FS operation failed: Destination folder already exists');
    }

    await fsPromises.mkdir(destinationFolder);

    const fileNames = await fsPromises.readdir(sourceFolder);

    for (const fileName of fileNames) {
      const sourcePath = path.join(sourceFolder, fileName);
      const destinationPath = path.join(destinationFolder, fileName);
      await fsPromises.copyFile(sourcePath, destinationPath);
    }

    console.log('Folder copied successfully!');
  } catch (error) {
    throw error;
  }
};

await copy();
