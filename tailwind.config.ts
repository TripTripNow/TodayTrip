import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // mediaQuery
      screens: {
        pc: { min: '1024px' },
        tablet: { min: '768px', max: '1023px' },
        mobile: { max: '767px' },
      },

      // Global Color
      colors: {},
    },
  },
  plugins: [],
};
export default config;
