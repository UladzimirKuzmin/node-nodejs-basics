import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import crypto from 'crypto';

import { pathExists } from '../pathExists.js';

const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

  try {
    if (await pathExists(filePath)) {
      const data = await fsPromises.readFile(filePath);

      // Create a hash object with the "sha256" algorithm
      const hash = crypto.createHash('sha256');

      // Update the hash object with the file data
      hash.update(data);

      // Calculate the hash digest as a hexadecimal string
      const hashHex = hash.digest('hex');

      console.log('SHA256 hash:', hashHex);
    } else {
      throw new Error(
        'FS operation failed: File to read does not exist or inaccessible'
      );
    }
  } catch (error) {
    throw error;
  }
};

await calculateHash();
