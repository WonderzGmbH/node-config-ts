import * as assert from 'assert';

import { derivePathsFromSchema, Schema } from '../schemaHelpers';

describe('derivePathsFromSchema', () => {
  it('test output for schema01', async () => {
    const schema = await import('./__fixtures__//schema01.json');

    const actual = derivePathsFromSchema(schema as unknown as Schema);
    assert.deepStrictEqual(actual, [
      { path: 'aws', type: 'object' },
      { path: 'aws.DynamoDb', type: 'object' },
      { path: 'aws.DynamoDb.lutTableName', type: 'string' },
      { path: 'aws.FeedCron', type: 'object' },
      { path: 'aws.FeedCron.SNSTopic', type: 'string' },
      { path: 'aws.ImageConvert', type: 'object' },
      { path: 'aws.ImageConvert.SNSTopic', type: 'string' },
      { path: 'aws.Lambda', type: 'object' },
      { path: 'aws.Lambda.secret', type: 'string' },
      { path: 'aws.MediaConvert', type: 'object' },
      { path: 'aws.MediaConvert.endpoint', type: 'string' },
      { path: 'aws.MediaConvert.queue', type: 'string' },
      { path: 'aws.MediaConvert.roleARN', type: 'string' },
      { path: 'aws.buckets', type: 'object' },
      { path: 'aws.buckets.content', type: 'string' },
      { path: 'aws.buckets.files', type: 'string' },
      { path: 'aws.buckets.output', type: 'string' },
      { path: 'aws.buckets.upload', type: 'string' },
      { path: 'aws.cdn', type: 'object' },
      { path: 'aws.cdn.baseUrl', type: 'string' },
      { path: 'aws.defaultRegion', type: 'string' },
      { path: 'aws.hook', type: 'object' },
      { path: 'aws.hook.SNSTopic', type: 'string' },
      { path: 'aws.key', type: 'string' },
      { path: 'aws.secret', type: 'string' },
      { path: 'baseUrl', type: 'string' },
      { path: 'cache', type: 'object' },
      { path: 'cache.duration', type: 'number' },
      { path: 'cookie', type: 'object' },
      { path: 'cookie.domain', type: 'string' },
      { path: 'cookie.name', type: 'string' },
      { path: 'db', type: 'object' },
      { path: 'db.charset', type: 'string' },
      { path: 'db.database', type: 'string' },
      { path: 'db.dialect', type: 'string' },
      { path: 'db.host', type: 'string' },
      { path: 'db.logging', type: undefined },
      { path: 'db.operatorsAliases', type: 'number' },
      { path: 'db.password', type: 'string' },
      { path: 'db.port', type: 'number' },
      { path: 'db.seederStorage', type: 'string' },
      { path: 'db.timezone', type: 'string' },
      { path: 'db.username', type: 'string' },
      { path: 'dbdump', type: 'object' },
      { path: 'dbdump.output', type: 'string' },
      { path: 'excludeUrls', type: 'array' },
      { path: 'excludeUrls[]', type: 'string' },
      { path: 'postDeploymentBodyLimit', type: 'number' },
      { path: 'pqueue', type: 'object' },
      { path: 'pqueue.concurrency', type: 'number' },
      { path: 'sentry', type: 'object' },
      { path: 'sentry.defaultSampleRate', type: 'number' },
      { path: 'sentry.enabled', type: 'boolean' },
      { path: 'sentry.endpoint', type: 'string' },
      { path: 'sentry.integrations', type: 'object' },
      { path: 'sentry.integrations.fastifyHooks', type: 'boolean' },
      { path: 'sentry.integrations.fastifyMiddleware', type: 'boolean' },
      { path: 'sentry.integrations.http', type: 'boolean' },
      { path: 'sentry.integrations.mysql', type: 'boolean' },
      { path: 'throttle', type: 'object' },
      { path: 'throttle.burst', type: 'number' },
      { path: 'throttle.max', type: 'number' },
      { path: 'throttle.rate', type: 'number' },
      { path: 'throttle.timeWindow', type: 'string' },
      { path: 'token', type: 'object' },
      { path: 'token.signingKey', type: 'string' },
    ]);
  });

  it('test output for schema02', async () => {
    const schema = await import('./__fixtures__//schema02.json');

    const actual = derivePathsFromSchema(schema as unknown as Schema);
    assert.deepStrictEqual(actual, [
      { path: 'firstName', type: 'string' },
      { path: 'lastName', type: 'string' },
      { path: 'age', type: 'integer' },
      { path: 'address', type: 'object' },
      { path: 'address.city', type: 'string' },
      { path: 'address.country', type: 'string' },
    ]);
  });

  it('test output for schema03', async () => {
    const schema = await import('./__fixtures__//schema03.json');

    const actual = derivePathsFromSchema(schema as unknown as Schema);
    assert.deepStrictEqual(actual, [
      { path: 'fruits', type: 'array' },
      { path: 'fruits[]', type: 'string' },
      { path: 'vegetables', type: 'array' },
      { path: 'vegetables[]', type: 'object' },
      { path: 'vegetables[].veggieName', type: 'string' },
      { path: 'vegetables[].veggieLike', type: 'boolean' },
    ]);
  });
});
