import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const WiSaveTheme = definePreset(Aura, {
  components: {
    button: {
      colorScheme: {
        light: {
          outlined: {
            secondary: {
              color: 'var(--color-primary-100)',
              hoverBackground: 'var(--color-primary-100)',
              borderColor: 'var(--color-primary-100)',
            },
          },
        },
      },
    },
  },
  semantic: {
    primary: {
      50: 'var(--color-primary-50)',
      100: 'var(--color-primary-100)',
      200: 'var(--color-primary-200)',
      300: 'var(--color-primary-300)',
      400: 'var(--color-primary-400)',
      500: 'var(--color-primary-500)',
      600: 'var(--color-primary-600)',
      700: 'var(--color-primary-700)',
      800: 'var(--color-primary-800)',
      900: 'var(--color-primary-900)',
      950: 'var(--color-primary-950)',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{hunter.500}',
          contrastColor: '#ffffff',
          hoverColor: '{hunter.600}',
          activeColor: '{hunter.700}',
        },
      },
      dark: {
        primary: {
          50: '#e7e9ec',
          100: '#c2c8d2',
          200: '#9ea9ba',
          300: '#7a8aa2',
          400: '#475b7f',
          500: '#14213d',
          600: '#111c34',
          700: '#0e172b',
          800: '#0b1222',
          900: '#080d19',
          950: '#04060d',
          color: '#14213d',
          contrastColor: '#ffffff',
          hoverColor: '#1d2e54',
          activeColor: '#263b6b',
        },
      },
    },
  },
  primitive: {},
});

export default WiSaveTheme;
