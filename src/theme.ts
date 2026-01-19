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
    datatable: {
      colorScheme: {
        dark: {
          header: {
            background: 'var(--color-dark-primary-900)',
            borderColor: 'var(--color-dark-primary-600)',
            color: 'var(--color-dark-secondary-50)',
            padding: '1rem',
          },
          headerCell: {
            background: 'var(--color-dark-primary-900)',
            hoverBackground: 'var(--color-dark-primary-700)',
            selectedBackground: 'var(--color-dark-primary-700)',
            borderColor: 'var(--color-dark-primary-600)',
            color: 'var(--color-dark-secondary-50)',
            hoverColor: 'var(--color-dark-secondary-50)',
            selectedColor: 'var(--color-accent-400)',
            padding: '0.75rem 1rem',
            focusRing: {
              width: '2px',
              style: 'solid',
              color: 'var(--color-accent-500)',
              offset: '-2px',
            },
          },
          columnTitle: {
            fontWeight: '600',
          },
          row: {
            background: 'var(--color-dark-primary-800)',
            hoverBackground: 'var(--color-dark-primary-700)',
            selectedBackground: 'hsla(35, 74%, 49%, 0.15)',
            color: 'var(--color-dark-secondary-100)',
            hoverColor: 'var(--color-dark-secondary-50)',
            selectedColor: 'var(--color-dark-secondary-50)',
            stripedBackground: 'var(--color-dark-primary-900)',
            focusRing: {
              width: '2px',
              style: 'solid',
              color: 'var(--color-accent-500)',
              offset: '-2px',
            },
          },
          bodyCell: {
            borderColor: 'var(--color-dark-primary-700)',
            padding: '0.75rem 1rem',
            selectedBorderColor: 'var(--color-accent-600)',
          },
          footerCell: {
            background: 'var(--color-dark-primary-900)',
            borderColor: 'var(--color-dark-primary-600)',
            color: 'var(--color-dark-secondary-100)',
            padding: '0.75rem 1rem',
          },
          columnFooter: {
            fontWeight: '600',
          },
          footer: {
            background: 'var(--color-dark-primary-900)',
            borderColor: 'var(--color-dark-primary-600)',
            color: 'var(--color-dark-secondary-100)',
            padding: '1rem',
          },
          rowToggleButton: {
            hoverBackground: 'var(--color-dark-primary-700)',
            selectedHoverBackground: 'var(--color-dark-primary-600)',
            color: 'var(--color-dark-secondary-200)',
            hoverColor: 'var(--color-dark-secondary-50)',
            selectedHoverColor: 'var(--color-accent-400)',
            size: '2rem',
            borderRadius: '50%',
          },
          sortIcon: {
            color: 'var(--color-dark-secondary-300)',
            hoverColor: 'var(--color-dark-secondary-100)',
            size: '0.875rem',
          },
          loadingIcon: {
            size: '2rem',
          },
          filter: {
            inlineGap: '0.5rem',
            overlaySelect: {
              background: 'var(--color-dark-primary-800)',
              borderColor: 'var(--color-dark-primary-600)',
              color: 'var(--color-dark-secondary-100)',
            },
            rule: {
              borderColor: 'var(--color-dark-primary-600)',
            },
            constraintList: {
              padding: '0.5rem',
              gap: '0.25rem',
            },
            constraint: {
              focusBackground: 'var(--color-dark-primary-700)',
              selectedBackground: 'var(--color-accent-500)',
              selectedFocusBackground: 'var(--color-accent-600)',
              color: 'var(--color-dark-secondary-100)',
              focusColor: 'var(--color-dark-secondary-50)',
              selectedColor: 'var(--color-dark-primary-900)',
              selectedFocusColor: 'var(--color-dark-primary-900)',
              separator: {
                borderColor: 'var(--color-dark-primary-600)',
              },
              padding: '0.5rem 0.75rem',
              borderRadius: '4px',
            },
          },
          paginatorTop: {
            borderColor: 'var(--color-dark-primary-600)',
          },
          paginatorBottom: {
            borderColor: 'var(--color-dark-primary-600)',
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
