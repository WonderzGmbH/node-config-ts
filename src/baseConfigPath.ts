/**
 * Default config directory
 */
const DEFAULT_BASE_DIR = 'config';

/**
 * Returns the base path for loading the configurations.
 */
export const baseConfigPath = (process: NodeJS.Process): string => {
  return process.env['NODE_CONFIG_TS_DIR'] || DEFAULT_BASE_DIR;
};
