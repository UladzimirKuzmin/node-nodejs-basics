const parseEnv = () => {
  const prefix = 'RSS_';

  const filteredVariables = Object.entries(process.env)
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');

  console.log(filteredVariables);
};

parseEnv();
