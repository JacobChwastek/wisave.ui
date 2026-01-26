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
        dark: {
          root: {
            secondary: {
              background: 'transparent',
              hoverBackground: 'var(--color-dark-primary-700)',
              activeBackground: 'var(--color-dark-primary-600)',
              borderColor: 'var(--color-dark-primary-500)',
              hoverBorderColor: 'var(--color-dark-primary-400)',
              color: 'var(--color-dark-secondary-100)',
              hoverColor: 'var(--color-dark-secondary-50)',
              activeColor: 'var(--color-dark-secondary-50)',
            },
          },
          outlined: {
            secondary: {
              hoverBackground: 'var(--color-dark-primary-700)',
              activeBackground: 'var(--color-dark-primary-600)',
              borderColor: 'var(--color-dark-primary-400)',
              color: 'var(--color-dark-secondary-100)',
            },
          },
          text: {
            secondary: {
              hoverBackground: 'var(--color-dark-primary-700)',
              activeBackground: 'var(--color-dark-primary-600)',
              color: 'var(--color-dark-secondary-200)',
            },
          },
        },
      },
    },
    inputtext: {
      colorScheme: {
        dark: {
          root: {
            background: 'var(--color-dark-primary-900)',
            disabledBackground: 'var(--color-dark-primary-800)',
            filledBackground: 'var(--color-dark-primary-800)',
            filledHoverBackground: 'var(--color-dark-primary-700)',
            filledFocusBackground: 'var(--color-dark-primary-700)',
            borderColor: 'var(--color-dark-primary-500)',
            hoverBorderColor: 'var(--color-dark-primary-400)',
            focusBorderColor: 'var(--color-accent-500)',
            invalidBorderColor: '#ef4444',
            color: 'var(--color-dark-secondary-50)',
            disabledColor: 'var(--color-dark-secondary-400)',
            placeholderColor: 'var(--color-dark-secondary-400)',
            invalidPlaceholderColor: '#fca5a5',
            shadow: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    textarea: {
      colorScheme: {
        dark: {
          root: {
            background: 'var(--color-dark-primary-900)',
            borderColor: 'var(--color-dark-primary-500)',
            hoverBorderColor: 'var(--color-dark-primary-400)',
            focusBorderColor: 'var(--color-accent-500)',
            color: 'var(--color-dark-secondary-50)',
            placeholderColor: 'var(--color-dark-secondary-400)',
          },
        },
      },
    },
    select: {
      colorScheme: {
        dark: {
          root: {
            background: 'var(--color-dark-primary-900)',
            disabledBackground: 'var(--color-dark-primary-800)',
            borderColor: 'var(--color-dark-primary-500)',
            hoverBorderColor: 'var(--color-dark-primary-400)',
            focusBorderColor: 'var(--color-accent-500)',
            invalidBorderColor: '#ef4444',
            color: 'var(--color-dark-secondary-50)',
            disabledColor: 'var(--color-dark-secondary-400)',
            placeholderColor: 'var(--color-dark-secondary-400)',
            shadow: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
          },
          dropdown: {
            color: 'var(--color-dark-secondary-200)',
          },
          overlay: {
            background: 'var(--color-dark-primary-800)',
            borderColor: 'var(--color-dark-primary-600)',
            color: 'var(--color-dark-secondary-100)',
            shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
          },
          option: {
            focusBackground: 'var(--color-dark-primary-700)',
            selectedBackground: 'var(--color-accent-600)',
            selectedFocusBackground: 'var(--color-accent-500)',
            color: 'var(--color-dark-secondary-100)',
            focusColor: 'var(--color-dark-secondary-50)',
            selectedColor: 'var(--color-dark-primary-950)',
            selectedFocusColor: 'var(--color-dark-primary-950)',
          },
          optionGroup: {
            background: 'var(--color-dark-primary-800)',
            color: 'var(--color-dark-secondary-300)',
          },
          clearIcon: {
            color: 'var(--color-dark-secondary-300)',
          },
        },
      },
    },
    datepicker: {
      colorScheme: {
        dark: {
          panel: {
            background: 'var(--color-dark-primary-800)',
            borderColor: 'var(--color-dark-primary-600)',
            color: 'var(--color-dark-secondary-100)',
            shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',
          },
          header: {
            borderColor: 'var(--color-dark-primary-600)',
            color: 'var(--color-dark-secondary-50)',
          },
          dropdown: {
            background: 'var(--color-dark-primary-700)',
            color: 'var(--color-dark-secondary-100)',
          },
          date: {
            hoverBackground: 'var(--color-dark-primary-700)',
            selectedBackground: 'var(--color-accent-500)',
            rangeSelectedBackground: 'var(--color-accent-600)',
            color: 'var(--color-dark-secondary-100)',
            hoverColor: 'var(--color-dark-secondary-50)',
            selectedColor: 'var(--color-dark-primary-950)',
            rangeSelectedColor: 'var(--color-dark-primary-950)',
          },
          buttonbar: {
            borderColor: 'var(--color-dark-primary-600)',
          },
          timePicker: {
            borderColor: 'var(--color-dark-primary-600)',
          },
        },
      },
    },
    chip: {
      colorScheme: {
        dark: {
          root: {
            background: 'var(--color-dark-primary-700)',
            color: 'var(--color-dark-secondary-100)',
            borderRadius: '1rem',
          },
          icon: {
            color: 'var(--color-dark-secondary-200)',
          },
          removeIcon: {
            color: 'var(--color-dark-secondary-300)',
          },
        },
      },
    },
    iconfield: {
      colorScheme: {
        dark: {
          icon: {
            color: 'var(--color-dark-secondary-400)',
          },
        },
      },
    },
    paginator: {
      colorScheme: {
        dark: {
          root: {
            background: 'var(--color-dark-primary-900)',
            color: 'var(--color-dark-secondary-200)',
          },
          navButton: {
            background: 'transparent',
            hoverBackground: 'var(--color-dark-primary-700)',
            selectedBackground: 'var(--color-accent-500)',
            color: 'var(--color-dark-secondary-200)',
            hoverColor: 'var(--color-dark-secondary-50)',
            selectedColor: 'var(--color-dark-primary-950)',
          },
        },
      },
    },
    datatable: {
      colorScheme: {
        dark: {
          root: {
            borderColor: 'var(--color-dark-primary-700)',
          },
          header: {
            background: 'var(--color-dark-primary-900)',
            borderColor: 'var(--color-dark-primary-700)',
            color: 'var(--color-dark-secondary-50)',
            padding: '1rem 1.25rem',
          },
          headerCell: {
            background: 'var(--color-dark-primary-850)',
            hoverBackground: 'var(--color-dark-primary-750)',
            selectedBackground: 'var(--color-dark-primary-700)',
            borderColor: 'var(--color-dark-primary-700)',
            color: 'var(--color-dark-secondary-100)',
            hoverColor: 'var(--color-dark-secondary-50)',
            selectedColor: 'var(--color-accent-400)',
            padding: '0.875rem 1rem',
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
            hoverBackground: 'var(--color-dark-primary-750)',
            selectedBackground: 'hsla(35, 74%, 49%, 0.12)',
            color: 'var(--color-dark-secondary-100)',
            hoverColor: 'var(--color-dark-secondary-50)',
            selectedColor: 'var(--color-dark-secondary-50)',
            stripedBackground: 'var(--color-dark-primary-850)',
            focusRing: {
              width: '0',
              style: 'none',
              color: 'transparent',
              offset: '0',
            },
          },
          bodyCell: {
            borderColor: 'var(--color-dark-primary-750)',
            padding: '0.875rem 1rem',
            selectedBorderColor: 'var(--color-accent-600)',
          },
          footerCell: {
            background: 'var(--color-dark-primary-850)',
            borderColor: 'var(--color-dark-primary-700)',
            color: 'var(--color-dark-secondary-100)',
            padding: '0.875rem 1rem',
          },
          columnFooter: {
            fontWeight: '600',
          },
          footer: {
            background: 'var(--color-dark-primary-900)',
            borderColor: 'var(--color-dark-primary-700)',
            color: 'var(--color-dark-secondary-100)',
            padding: '1rem 1.25rem',
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
            color: 'var(--color-dark-secondary-400)',
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
              selectedColor: 'var(--color-dark-primary-950)',
              selectedFocusColor: 'var(--color-dark-primary-950)',
              separator: {
                borderColor: 'var(--color-dark-primary-600)',
              },
              padding: '0.5rem 0.75rem',
              borderRadius: '6px',
            },
          },
          paginatorTop: {
            borderColor: 'var(--color-dark-primary-700)',
          },
          paginatorBottom: {
            borderColor: 'var(--color-dark-primary-700)',
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
