import { Transform } from 'stream';

const transform = async () => {
  const reverseText = new Transform({
    transform(chunk, encoding, callback) {
      const reversedChunk = chunk.toString().split('').reverse().join('');
      this.push(reversedChunk);
      callback();
    },
  });

  await new Promise((resolve, reject) => {
    process.stdin
      .pipe(reverseText)
      .pipe(process.stdout)
      .on('finish', resolve)
      .on('error', reject);
  });
};

await transform();
