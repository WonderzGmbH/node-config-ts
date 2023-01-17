import { overwriteWithCustomEnvVars } from '../overwriteWithCustomEnvVars';
import * as assert from 'assert';
import path from 'path';

describe('overwriteWithCustomEnvVars', () => {
  //
  //
  it('generate config from custom-environment-variables.json and ENV', () => {
    const process = {
      cwd: () => path.resolve(__dirname, '__fixtures__'),
      env: {
        PORT: '5050',
        TIMEOUT_STEP_2: '234',
        TIMEOUT_STEP_3: '321',
        123: 'testtest',
      },
    };
    const expectedOutput = {
      timeouts: {
        step2: 234,
        step3: 321,
      },
      level1: {
        item1: 'testtest',
      },
    };
    const actual = overwriteWithCustomEnvVars(process as unknown as NodeJS.Process);
    assert.deepStrictEqual(actual, expectedOutput);
  });

  //
  //
  it('without schema.json', () => {
    const process = {
      cwd: () => path.resolve(__dirname, '__fixtures2__'),
      env: {
        PORT: '5050',
        TIMEOUT_STEP_2: '234',
        TIMEOUT_STEP_3: '321',
        123: 'testtest',
      },
    };
    const expectedOutput = {
      timeouts: {
        step2: '234',
        step3: '321',
      },
      level1: {
        item1: 'testtest',
      },
    };
    const actual = overwriteWithCustomEnvVars(process as unknown as NodeJS.Process);
    assert.deepStrictEqual(actual, expectedOutput);
  });
});
