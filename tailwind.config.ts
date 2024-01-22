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
      colors: {
        black17: '#171717',
        black1B: '#1b1b1b',
        nomad_black: '#112211',
        whiteFF: '#ffffff',
        gray4B: '#4B4B4B',
        gray79: '#79747E',
        grayA4: '#A4A1AA',
        grayAD: '#ADAEB8',
        grayEE: '#EEEEEE',
        grayCB: '#CBC9CF',
        grayDD: '#DDDDDD',
        grayFA: '#FAFAFA',
        green0B: '#0B3B2D',
        greenCE: '#CED8D5',
        green00: '#00AC07',
        redFF4: '#FF472E',
        redFFE: '#FFE4E0',
        orangeFF7: '#FF7C1D',
        orangeFFF: '#FFF4E8',
        yellowFF: '#FFC23D',
        blue00: '#0085FF',
        blue2E: '#2EB4FF',
        blueE5: '#E5F3FF',
      },
    },
  },
  plugins: [],
};
export default config;
