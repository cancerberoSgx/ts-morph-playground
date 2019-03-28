import { Theme } from './theme'

export const commonStyles = (theme: Theme) => ({
  '@global': {
    button: {
      color: theme.colorPrimary
    },
    textarea: {
      backgroundColor: theme.backgroundColor,
      color: theme.foregroundColor,
      padding: 0,
      border: 0
    },
    a: {
      cursor: 'pointer',
      color: theme.colorPrimary
    },
    'a:hover': {
      textDecoration: 'underline'
    }
  }
})
