/**
 * Created by tushar on 30/12/17.
 */

import * as assert from 'assert';
import { loadCLIConfigs } from '../loadCliConfigs';

describe('load-cli-configs', () => {
  it('should load configs from cli', () => {
    const process = {
      argv: ['--port', '100', '--env', 'production'],
    };
    const actual = loadCLIConfigs(process);
    const expected = {
      port: 100,
      env: 'production',
    };
    assert.deepStrictEqual(actual, expected);
  });
});
