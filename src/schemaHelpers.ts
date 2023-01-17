const debug = require('debug')('config:schema'); // eslint-disable-line @typescript-eslint/no-var-requires

export type Schema = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

type SchemaPathTypeMapping = {
  path: string;
  type: string;
};

type Definitions = { getRefValue: (ref: string) => Schema };
type DefinitionStore = {
  $defs: Record<string, Schema>;
  definitions: Record<string, Schema>;
};
type DefinitionName = keyof DefinitionStore;

//
//
function createDefinitions(schema: Schema) {
  const { $defs, definitions } = schema;
  const store: DefinitionStore = {
    $defs: $defs ?? {},
    definitions: definitions ?? {},
  };

  const getRefName = (ref: string): { loc: DefinitionName; name: string } => {
    if (ref?.startsWith('#/definitions/') || ref?.startsWith('#/$defs/')) {
      const splits = ref.split('/');
      return { loc: splits[1] as DefinitionName, name: splits[2] };
    }
    throw new Error(`cannot handle ref type (${ref})`);
  };
  const getRefValue = (ref: string) => {
    const { loc, name } = getRefName(ref);
    const val = store[loc][name];
    if (val == null) {
      throw new Error(`ref not found (${ref})`);
    }
    return val;
  };

  return {
    getRefValue,
  };
}

//
//
function traverse(
  result: Array<SchemaPathTypeMapping>,
  node: Schema,
  definitions: Definitions,
  currentPath = ''
) {
  const { $ref, ...nodeProperties } = node;

  if ($ref != null) {
    const refDef = definitions.getRefValue($ref);
    node = {
      ...refDef,
      ...nodeProperties,
    };
  }

  const { type } = node;
  // console.log(node);

  if (type === 'object') {
    if (node.properties == null) {
      throw new Error('object w/o properties found');
    }
    if (currentPath !== '') {
      result.push({ path: currentPath, type });
    }
    for (const prop in node.properties) {
      const path = currentPath === '' ? prop : `${currentPath}.${prop}`;
      traverse(result, node.properties[prop], definitions, path);
    }
    return;
  }

  if (type === 'array') {
    result.push({ path: currentPath, type });
    traverse(result, node.items, definitions, `${currentPath}[]`);
    return;
  }

  result.push({ path: currentPath, type });
}

//
//
export function derivePathsFromSchema(schema: Schema) {
  const definitions = createDefinitions(schema);
  const result: Array<SchemaPathTypeMapping> = [];
  traverse(result, schema, definitions);
  debug(result);
  return result;
}
