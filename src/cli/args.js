const parseArgs = () => {
  const args = process.argv.slice(2);

  const formattedOutput = args
    .map((arg, index) => {
      if (index % 2 === 0) {
        const propName = arg.replace(/^--/, '');
        const value = args[index + 1];
        return `${propName} is ${value}`;
      }
    })
    .filter(Boolean)
    .join(', ');

  console.log(formattedOutput);
};

parseArgs();
