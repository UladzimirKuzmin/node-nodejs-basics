import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import { pathExists } from '../pathExists.js';

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const sourceFile = path.join(__dirname, 'files', 'wrongFilename.txt');
  const destinationFile = path.join(__dirname, 'files', 'properFilename.md');

  try {
    if (await pathExists(destinationFile)) {
      throw new Error('FS operation failed: Destination file already exists');
    }

    if (await pathExists(sourceFile)) {
      await fsPromises.rename(sourceFile, destinationFile);
      console.log('File renamed successfully!');
    } else {
      throw new Error(
        'FS operation failed: Source file does not exist or inaccessible'
      );
    }
  } catch (error) {
    throw error;
  }
};

await rename();
