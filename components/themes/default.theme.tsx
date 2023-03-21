import { darken } from '@theme-ui/color'
import { IBM_Plex_Mono, Open_Sans } from 'next/font/google'
import type { Theme } from 'theme-ui'

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
})

const openSans = Open_Sans({
  subsets: ['latin'],
})

const maxWidth = '768px'

export const defaultTheme: Theme = {
  fonts: {
    body: openSans.style.fontFamily,
    heading: openSans.style.fontFamily,
    monospace: ibmPlexMono.style.fontFamily,
  },
  text: {
    default: {
      fontFamily: 'body',
    },
    small: {
      fontSize: '0.8em',
      fontFamily: 'body',
    },
    display: {
      fontFamily: 'monospace',
      fontSize: '5em',
      fontWeight: 'bold',
    },
    title: {
      fontSize: '2em',
      fontFamily: 'heading',
    },
    paragraph: {
      color: '#666',
      textAlign: 'justify',
    },
  },
  colors: {
    text: '#333',
    background: '#fff',
    primary: '#f55e3c',
    yellow: '#eab440',
    green: '#81ab6a',
  },
  buttons: {
    primary: {
      color: 'white',
      fontFamily: 'body',
      '&:hover, &:focus, &:active': {
        bg: darken('primary', 0.2),
      },
      '&:disabled': {
        opacity: 0.4,
        bg: 'primary',
      },
    },
  },
  messages: {
    warn: {
      backgroundColor: '#fffced',
      borderColor: '#d98b6c',
    },
  },
  grids: {
    contained: {
      alignItems: 'start',
      justifyContent: 'space-between',
      mx: 'auto',
      maxWidth,
      padding: '1em',
      width: '100%',
    },
  },
  styles: {
    hr: {
      borderColor: '#eee',
      maxWidth,
      mx: 'auto',
    },
  },
}
