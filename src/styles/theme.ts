import { theme, extendTheme } from '@chakra-ui/react'


export const customTheme = extendTheme({
  styles: {
    global: {
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
      },

      body: {
        background: 'gray.50',
      },

      'body, input, textarea, button': {
        font: '500 1rem Inter, sans-serif',
        color: 'gray.500'
      },

      button: {
        cursor: 'pointer'
      },

      'img': {
        borderRadius: '0.5rem'
      }
    }
  },
  breakpoints: {
    ...theme.breakpoints
  },
  fontWeights: {
    ...theme.fontWeights,
    normal: 400,
    medium: 600,
    bold: 700
  },
  radii: {
    ...theme.radii
  },
  fontSizes: {
    ...theme.fontSizes
  },
  colors: {
    ...theme.colors,
    gray: {
      ...theme.colors.gray,
      50: '#F7F8FA',
      100: '#E6E8EB',
      200: '#AFB2B1',
      500: '#808080',
      700: '#494D4B',
      800: '#37474F',
      830: '#202024',
      850: '#282A36',
      900: '#121214'
    },
    blue: {
      ...theme.colors.blue,
      600: '#5965E0',
      620: '#4953B8',
      700: '#3346FF',
      800: '#2E384D',
      900: '#1A203C',
    },
    red: {
      ...theme.colors.red,
      600: '#E83F5B',
      610: '#FF2513'
    },
    green: {
      ...theme.colors.green,
      400: '#04D361'
    }
  }
})

export default customTheme