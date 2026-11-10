// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'perfectionist/sort-imports': [
      'error',
      {
        type: 'alphabetical',
        order: 'asc',
        fallbackSort: { type: 'unsorted' },
        ignoreCase: true,
        specialCharacters: 'keep',
        internalPattern: ['^@/.+'],
        partitionByComment: false,
        partitionByNewLine: false,
        newlinesBetween: 1,
        maxLineLength: undefined,
        groups: [
          'vue',
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'style',
          'unknown',
        ],
        customGroups: [
          {
            groupName: 'vue',
            elementNamePattern: ['^vue$', '^vue-.+'],
          },
        ],
      },
    ],
  },
})
