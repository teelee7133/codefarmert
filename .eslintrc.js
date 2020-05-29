module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true,
        'jest': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 11,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
    ],
    'rules': {
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single',
            { "allowTemplateLiterals": true }
        ],
        'semi': [
            'error',
            'always'
        ],
        'react/prop-types': [
            'off',
            {}
        ]
    }
};