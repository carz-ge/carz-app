import {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'graphql/schema.graphql',
  documents: 'graphql/operations-gqls/**/*.gql',
  overwrite: true,
  generates: {
    'src/graphql/operations.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
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
