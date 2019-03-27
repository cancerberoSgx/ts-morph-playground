import { Styles } from 'react-jss'
import { Theme } from './theme'
/** auxiliary function to type check CSS Properties */
export function createStyles<C extends string = string>(styles: { [c: string]: React.CSSProperties }): Styles<C> {
  return styles as Styles<C>
}

export const commonStyles = (theme: Theme) =>
  createStyles({
    button: {
      color: theme.colorPrimary
    },
    textarea: {
      backgroundColor: theme.backgroundColor,
      color: theme.foregroundColor
    }
  })
