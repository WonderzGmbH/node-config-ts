/**
 * Created by tushar on 10/01/18.
 */
import { replaceWithEnvVar } from '../replaceWithEnvVar';
import * as assert from 'assert';

describe('replaceWithEnvVar', () => {
  it('should merge base config with available env variables', () => {
    const process = {
      env: {
        PORT: '5050',
      },
    };
    const baseConfig = {
      a: 'a',
      b: '@@PORT',
    };
    const actual = replaceWithEnvVar(baseConfig, process as unknown as NodeJS.Process);
    const expected = { ...baseConfig, b: '5050' };
    assert.deepStrictEqual(actual, expected);
  });

  it('should merge with deeply nested configs also', () => {
    const process = {
      env: {
        PORT: '5050',
      },
    };
    const baseConfig = {
      a: {
        b: {
          c: '@@PORT',
        },
      },
    };
    const actual = replaceWithEnvVar(baseConfig, process as unknown as NodeJS.Process);
    const expected = { a: { b: { c: '5050' } } };
    assert.deepStrictEqual(actual, expected);
  });
});
