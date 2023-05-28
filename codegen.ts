import {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'graphql/schema.graphql',
  documents: 'graphql/generated-operations/**/*.gql',
  overwrite: true,
  generates: {
    'graphql/operations.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ],
      config: {
        dedupeOperationSuffix: true,
        omitOperationSuffix: true,
      },
    },
    // "./src/graphql/introspection.json": {
    //   plugins: ["introspection"]
    // }
  },
  config: {
    preResolveTypes: true,
    avoidOptionals: {
      field: true,
      inputValue: true,
      object: true,
      defaultValue: true,
    },
  },
};

export default config;
