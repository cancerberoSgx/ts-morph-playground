// import * as React from 'react'
// import { File, State } from '../store/types'
// import { connect } from 'react-redux'
// import { dispatch } from '..'
// import { Theme } from '../theme/theme';
// import { createStyles } from '../theme/style';
// import withStyles from 'react-jss'

// interface P {
//   Body: React.Component
//   title?: string
//   active?: boolean
// }

// class Modal_ extends React.Component<P, {}> {
//   render() {
//     return (
//       <article className="modal">
//         <h3>{this.props.title}</h3>
//         <button onClick={e => this.add()}>Close</button>

//       </article>
//     )
//   }
// }

// const mapStateToProps = (state: State) => ({
// })

// export const Modal = connect(mapStateToProps)(Modal_)

// const styles = (theme: Theme) =>
//   createStyles({
//     editor: {
//       width: '100%',
//       height: '500px'
//     }
//   })

// export const Modal = withStyles(styles)(
//   connect((state: State) => ({
//     files: [...state.files, ...state.examples],
//     selectedFile: state.selectedFile
//   }))(Modal_)
// )
