/** @type {import('tailwindcss').Config} */

import flowbitePlugin from 'flowbite/plugin';
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: '0.625rem', // 10px
        xxxs: '0.5rem', // 8px
      },
    },
  },
  plugins: [flowbitePlugin],
};
