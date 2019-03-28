// import jss, {StyleSheet}  from 'jss'
// import { Theme } from './theme';
// import * as React from 'react'
// import { WithSheet } from 'react-jss';

// // Note that `link` option is required.
// const sheet = jss.setup(preset())  .createStyleSheet(
//     {
//       foo: {
//         color: (theme: Theme)
//       }
//     },
//     {link: true}
//   )
//   .attach()

// sheet.update({color: 'red'})

// // Create your style.
// const style = {
//   myButton: {
//     color: 'green'
//   }
// }

// Compile styles, apply plugins.
// const sheet = jss.createStyleSheet(style)

// const jss = create({plugins:[global(), camelCase()] })
// jss.use(camelCase(), global())

// const sheets = new SheetsRegistry()
const styles = {
  ggg: {
    margin: 0,
    padding: '1em'
    // 'background-color': (theme: Theme)=>theme.backgroundColor,

    // backgroundColor: (theme: Theme)=>theme.backgroundColor,
    // color: (theme: Theme)=>theme.foregroundColor,
  }
  // '@global': {
  //   body: {
  //     // backgroundColor: theme.backgroundColor,
  //     // color: theme.foregroundColor,
  //     margin: 0,
  //     padding: '1em',
  //     'background-color': (theme: Theme)=>theme.backgroundColor,

  //     backgroundColor: (theme: Theme)=>theme.backgroundColor,
  //     color: (theme: Theme)=>theme.foregroundColor,
  //     // '@global': {
  //     //   "*": {
  //     //     backgroundColor: theme.backgroundColor,
  //     //     color: theme.foregroundColor,
  //     //   }
  //     // }
  //   },
  // 'body *': {
  //   fontSize: '3em',
  //     backgroundColor: (theme: Theme)=>theme.backgroundColor,
  //     color: (theme: Theme)=>theme.foregroundColor,
  // },
  // a: {
  //   textDecoration: 'underline',
  //   cursor: 'pointer'
  // },
  // wrapper: {
  //   display: 'grid',
  //   gridTemplateColumns: 'repeat(3, 1fr)',
  //   gridGap: '10px',
  //   gridAutoRows: 'minmax(100px, auto)'
  // },

  // } as any,
}

// sheets.add(sheet)
// let sheet:StyleSheet|undefined
// export function GlobalStyles({ theme }: WithSheet<typeof styles, Theme>) {

// if(!sheet) {
//   // const styles = (theme:Theme)=> ({

//   // const jss9 = jss.use(camelCase(), global())
//   sheet =  jss .createStyleSheet(
//    styles , {link: true, media: 'screen', classNamePrefix: 'seba'}
//   )
//   .attach() as any
// }
// // else {
//   debugger
//   sheet!.update(theme)

// const styles2 = {
//   container: {
//     height: '200px',
//     width: (data:Theme) => '2em'
//   },
//   button: {
//     color: (data:Theme)  => data.backgroundColor,
//     padding: (data:Theme)  => data.foregroundColor
//   }
// } as any

// const sheet2 = jss.createStyleSheet(styles2, {link: true}).attach()

// sheet2.update({
//   width: 100,
//   button: {
//     color: 'red',
//     padding: 20
//   }
// })

// }
// const sheet = jss

// return <style data-meta="sheet-2"></style>
// }
// sheets.toString() // Returns CSS of all attached Style Sheets together.
