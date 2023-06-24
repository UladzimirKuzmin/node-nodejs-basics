import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import { pathExists } from '../pathExists.js';

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'files', 'fresh.txt');

  try {
    if (await pathExists(filePath)) {
      throw new Error('FS operation failed: File already exists');
    } else {
      await fsPromises.writeFile(filePath, 'I am fresh and young');
      console.log('File created successfully!');
    }
  } catch (error) {
    throw error;
  }
};

await create();
