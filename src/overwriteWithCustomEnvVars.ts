const debug = require('debug')('config:overwrite'); // eslint-disable-line @typescript-eslint/no-var-requires

import * as R from 'ramda';
import * as fs from 'fs';
import path from 'path';

import { configPaths } from './configPaths';
import { derivePathsFromSchema } from './schemaHelpers';

type NestedValue = { [k: string]: string | number | boolean | NestedValue };

export const overwriteWithCustomEnvVars = (process: NodeJS.Process) => {
  const { defaultConfig } = configPaths(process);
  const pathObj = path.parse(defaultConfig);
  debug('pathObj', pathObj);
  const customEnvironmentVariablesPath = `${pathObj.dir}/custom-environment-variables${pathObj.ext}`;
  const customSchemaPath = `${pathObj.dir}/schema.json`;

  const doesFileExist = fs.existsSync(customEnvironmentVariablesPath);
  const doesSchemaExist = fs.existsSync(customSchemaPath);
  debug('customEnvironmentVariablesPath', customEnvironmentVariablesPath, doesFileExist);
  const foundVars: Array<{
    path: Array<string>;
    value: string;
    valueBasedOnSchema?: string | number | boolean;
  }> = [];
  if (doesFileExist === true) {
    const vars = require(customEnvironmentVariablesPath); // eslint-disable-line @typescript-eslint/no-var-requires
    debug(vars);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const itar = (value: any, path: Array<string>) => {
      debug('itar', value, path);
      if (R.is(Object, value)) {
        Object.keys(value).forEach((key) => {
          itar(value[key], [...path, key]);
        });
        return;
      }

      if (R.is(String, value)) {
        const val = process.env[value];
        if (val != null) {
          debug('found', value, path, val);
          foundVars.push({ path, value: val });
          return;
        }
      }
      return;
    };

    itar(vars, []);
    debug('foundVars', foundVars);

    if (doesSchemaExist === true) {
      debug('schema found, try to cast found string to expected type');
      const schema = require(customSchemaPath); // eslint-disable-line @typescript-eslint/no-var-requires
      const schemaPaths = derivePathsFromSchema(schema);
      debug('schemaPaths', schemaPaths);
      foundVars.forEach((f) => {
        const path = f.path.join('.');
        const foundType = schemaPaths.find((p) => p.path === path);
        if (foundType != null) {
          debug(path, foundType.type);

          if (foundType.type === 'integer') {
            const valAsInteger = parseInt(f.value, 10);
            if (Number.isNaN(valAsInteger) === false) {
              f.valueBasedOnSchema = valAsInteger;
            }
          }

          if (foundType.type === 'number') {
            const valAsNumber = Number(f.value);
            if (Number.isNaN(valAsNumber) === false) {
              f.valueBasedOnSchema = valAsNumber;
            }
          }

          if (foundType.type === 'boolean') {
            const valLowercase = f.value.toLowerCase();
            if (valLowercase === 'true' || valLowercase === '1') {
              f.valueBasedOnSchema = true;
            } else if (valLowercase === 'false' || valLowercase === '0') {
              f.valueBasedOnSchema = false;
            }
          }
        }
      });
    }
  }

  const obj: NestedValue = {};
  foundVars.forEach((f) => {
    let ref: NestedValue = obj;
    f.path.forEach((p, index) => {
      debug(p, index);
      if (index === f.path.length - 1) {
        if (f.valueBasedOnSchema != null) {
          ref[p] = f.valueBasedOnSchema;
        } else {
          ref[p] = f.value;
        }
        return;
      }
      if (ref[p] == null) {
        ref[p] = {};
      }
      ref = ref[p] as NestedValue;
    });
  });
  debug('obj', obj);
  return obj;
};
