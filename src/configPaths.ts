import path from 'path';

import { baseConfigPath } from './baseConfigPath';

const DEFAULT_FILENAME = 'default';

export type ConfigTypes = {
  defaultConfig: string;
  envConfig: string;
  deploymentConfig: string;
  userConfig: string;
};

export const configPaths = (process: NodeJS.Process): ConfigTypes => {
  const baseDIR = baseConfigPath(process);
  const defaultConfig = path.resolve(process.cwd(), `${baseDIR}/${DEFAULT_FILENAME}.json`);
  const envConfigFile = `${
    process.env['NODE_CONFIG_TS_ENV'] || process.env['NODE_ENV'] || DEFAULT_FILENAME
  }`;
  const envConfig = path.resolve(process.cwd(), `${baseDIR}/env/${envConfigFile}.json`);
  const deploymentConfig = path.resolve(
    process.cwd(),
    `${baseDIR}/deployment/${process.env['DEPLOYMENT'] || DEFAULT_FILENAME}.json`
  );
  const userConfig = path.resolve(
    process.cwd(),
    `${baseDIR}/user/${process.env['USER'] || process.env['USERNAME'] || DEFAULT_FILENAME}.json`
  );
  return { defaultConfig, envConfig, deploymentConfig, userConfig };
};
