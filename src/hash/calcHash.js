import { promises as fsPromises } from 'fs';
import crypto from 'crypto';

const calculateHash = async () => {
  const filePath = './files/fileToCalculateHashFor.txt';

  try {
    // Read the file asynchronously
    const data = await fsPromises.readFile(filePath);

    // Create a hash object with the "sha256" algorithm
    const hash = crypto.createHash('sha256');

    // Update the hash object with the file data
    hash.update(data);

    // Calculate the hash digest as a hexadecimal string
    const hashHex = hash.digest('hex');

    // Log the hash to the console
    console.log('SHA256 hash:', hashHex);
  } catch (err) {
    console.error('FS operation failed: Unable to read the file:', err.message);
  }
};

await calculateHash();
