import * as assert from 'assert';
import * as path from 'path';
import { mergeAllConfigs } from '../mergeAllConfigs';

describe('mergeAllConfigs()', () => {
  it('should load configs from all the places', () => {
    const process = {
      argv: [],
      cwd: () => path.resolve(__dirname, '__fixtures__'),
      env: {
        DEPLOYMENT: 'www.example.com',
        NODE_ENV: 'production',
        USER: 'root',
        MAX_RETRIES: 999,
      },
    };
    const actual = mergeAllConfigs(process as unknown as NodeJS.Process);
    const expected = {
      type: 'user',
      port: 9000,
      maxRetries: 999,
      timeouts: {
        step1: 1,
        step2: 2,
        step3: 3,
      },
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should override with cli configs', () => {
    const process = {
      argv: ['--port', '3000', '--wonder', 'woman'],
      cwd: () => path.resolve(__dirname, '__fixtures__'),
      env: {
        DEPLOYMENT: 'www.example.com',
        NODE_ENV: 'production',
        USER: 'root',
        MAX_RETRIES: 999,
      },
    };
    const actual = mergeAllConfigs(process as unknown as NodeJS.Process);
    const expected = {
      type: 'user',
      port: 3000,
      wonder: 'woman',
      maxRetries: 999,
      timeouts: {
        step1: 1,
        step2: 2,
        step3: 3,
      },
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should override ENV variables with cli configs', () => {
    const process = {
      argv: ['--port', '3000', '--maxRetries', '150'],
      cwd: () => path.resolve(__dirname, '__fixtures__'),
      env: {
        DEPLOYMENT: 'www.example.com',
        NODE_ENV: 'production',
        USER: 'root',
        MAX_RETRIES: 999,
      },
    };
    const actual = mergeAllConfigs(process as unknown as NodeJS.Process);
    const expected = {
      type: 'user',
      port: 3000,
      maxRetries: 150,
      timeouts: {
        step1: 1,
        step2: 2,
        step3: 3,
      },
    };
    assert.deepStrictEqual(actual, expected);
  });

  describe('alternative env varialble', () => {
    it('should load configs from all the places', () => {
      const process = {
        argv: [],
        cwd: () => path.resolve(__dirname, '__fixtures__'),
        env: {
          DEPLOYMENT: 'www.example.com',
          NODE_CONFIG_TS_ENV: 'production',
          USER: 'root',
          MAX_RETRIES: 999,
        },
      };
      const actual = mergeAllConfigs(process as unknown as NodeJS.Process);
      const expected = {
        type: 'user',
        port: 9000,
        maxRetries: 999,
        timeouts: {
          step1: 1,
          step2: 2,
          step3: 3,
        },
      };
      assert.deepStrictEqual(actual, expected);
    });
    it('should override with cli configs', () => {
      const process = {
        argv: ['--port', '3000', '--wonder', 'woman'],
        cwd: () => path.resolve(__dirname, '__fixtures__'),
        env: {
          DEPLOYMENT: 'www.example.com',
          NODE_CONFIG_TS_ENV: 'production',
          USER: 'root',
          MAX_RETRIES: 999,
        },
      };
      const actual = mergeAllConfigs(process as unknown as NodeJS.Process);
      const expected = {
        type: 'user',
        port: 3000,
        wonder: 'woman',
        maxRetries: 999,
        timeouts: {
          step1: 1,
          step2: 2,
          step3: 3,
        },
      };
      assert.deepStrictEqual(actual, expected);
    });
    it('should override ENV variables with cli configs', () => {
      const process = {
        argv: ['--port', '3000', '--maxRetries', '150'],
        cwd: () => path.resolve(__dirname, '__fixtures__'),
        env: {
          DEPLOYMENT: 'www.example.com',
          NODE_CONFIG_TS_ENV: 'production',
          USER: 'root',
          MAX_RETRIES: 999,
        },
      };
      const actual = mergeAllConfigs(process as unknown as NodeJS.Process);
      const expected = {
        type: 'user',
        port: 3000,
        maxRetries: 150,
        timeouts: {
          step1: 1,
          step2: 2,
          step3: 3,
        },
      };
      assert.deepStrictEqual(actual, expected);
    });

    //
    //
    it('use val from custom env vars', () => {
      const process = {
        argv: ['--port', '3000'],
        cwd: () => path.resolve(__dirname, '__fixtures__'),
        env: {
          DEPLOYMENT: 'www.example.com',
          NODE_CONFIG_TS_ENV: 'production',
          USER: 'root',
          MAX_RETRIES: 999,
          MAX_RETRIES_FROM_CUSTOM: 666,
        },
      };
      const actual = mergeAllConfigs(process as unknown as NodeJS.Process);
      const expected = {
        type: 'user',
        port: 3000,
        maxRetries: 666,
        timeouts: {
          step1: 1,
          step2: 2,
          step3: 3,
        },
      };
      assert.deepStrictEqual(actual, expected);
    });

    //
    //
    it('should override custom env vars variables with cli configs', () => {
      const process = {
        argv: ['--port', '3000', '--maxRetries', '150'],
        cwd: () => path.resolve(__dirname, '__fixtures__'),
        env: {
          DEPLOYMENT: 'www.example.com',
          NODE_CONFIG_TS_ENV: 'production',
          USER: 'root',
          MAX_RETRIES_FROM_CUSTOM: 666,
        },
      };
      const actual = mergeAllConfigs(process as unknown as NodeJS.Process);
      const expected = {
        type: 'user',
        port: 3000,
        maxRetries: 150,
        timeouts: {
          step1: 1,
          step2: 2,
          step3: 3,
        },
      };
      assert.deepStrictEqual(actual, expected);
    });

    //
    //
    it('should override custom env vars from file', () => {
      const process = {
        argv: ['--port', '3000', '--maxRetries', '150'],
        cwd: () => path.resolve(__dirname, '__fixtures__'),
        env: {
          DEPLOYMENT: 'www.example.com',
          NODE_CONFIG_TS_ENV: 'production',
          USER: 'root',
          MAX_RETRIES_FROM_CUSTOM: 666,
          TIMEOUT_STEP_2: 234,
          TIMEOUT_STEP_3: 321,
        },
      };
      const actual = mergeAllConfigs(process as unknown as NodeJS.Process);
      const expected = {
        type: 'user',
        port: 3000,
        maxRetries: 150,
        timeouts: {
          step1: 1,
          step2: 234,
          step3: 321,
        },
      };
      assert.deepStrictEqual(actual, expected);
    });
  });
});
