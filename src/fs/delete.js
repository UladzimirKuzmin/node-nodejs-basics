import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import { pathExists } from '../pathExists.js';

const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fileToRemove = path.join(__dirname, 'files', 'fileToRemove.txt');

  try {
    if (await pathExists(fileToRemove)) {
      await fsPromises.unlink(fileToRemove);
      console.log('File deleted successfully!');
    } else {
      throw new Error(
        'FS operation failed: File to remove does not exist or inaccessible'
      );
    }
  } catch (error) {
    throw error;
  }
};

await remove();
