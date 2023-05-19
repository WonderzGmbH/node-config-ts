import * as R from 'ramda';

/**
 * Merges the configs in the following order —
 * defaultConfig < envConfig < deploymentConfig < userConfig < customEnvVars < cliConfig
 * @param {ConfigSources} configs
 * @return {any}
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mergeFileConfigs = (configs: { [key: string]: any }) => {
  return R.reduce(R.mergeDeepRight, configs.defaultConfig, [
    configs.envConfig,
    configs.deploymentConfig,
    configs.userConfig,
  ]);
};
