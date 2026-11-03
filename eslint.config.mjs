import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
const config = [
  js.configs.recommended,
  ...nextVitals,
  { ignores: ['.next/**', 'node_modules/**'], rules: { 'no-undef': 'off', 'no-unused-vars': 'off', 'react-hooks/set-state-in-effect': 'off' } }
];
export default config;
