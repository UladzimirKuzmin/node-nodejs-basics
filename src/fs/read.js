import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import { pathExists } from '../pathExists.js';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fileToRead = path.join(__dirname, 'files', 'fileToRead.txt');

  try {
    if (await pathExists(fileToRead)) {
      const content = await fsPromises.readFile(fileToRead, 'utf8');
      console.log(content);
    } else {
      throw new Error(
        'FS operation failed: File to read does not exist or inaccessible'
      );
    }
  } catch (error) {
    throw error;
  }
};

await read();
