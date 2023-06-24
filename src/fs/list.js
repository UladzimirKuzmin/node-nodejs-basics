import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import { pathExists } from '../pathExists.js';

const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const folderPath = path.join(__dirname, 'files');

  try {
    if (await pathExists(folderPath)) {
      const filenames = await fsPromises.readdir(folderPath);
      console.log(filenames);
    } else {
      throw new Error('FS operation failed: Folder does not exist');
    }
  } catch (error) {
    throw error;
  }
};

await list();
